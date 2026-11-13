---
name: android-error-handling
description: Implement or debug typed results and expected domain, HTTP and storage error mapping in native Android Kotlin code. Use for concrete error-handling changes; use peer-review for read-only assessment and ui-design for user-facing error interaction design.
license: MIT
metadata:
  version: "1.2.4"
---

# Android Error Handling

## Start with the target project

1. Identify the owning module, active variant, observable contract, and requested change. Reuse its stack and types. Adapt examples only after checking the resolved APIs and existing call sites. If a linked companion is unavailable, use the project contract.
2. Before executing a build or test, inspect the chosen task and hooks for network calls, credentials, publishing, or shared writes. Use isolated fixtures by default for checks with external effects. Confirm the authorized target before any shared-system check.
3. Run the smallest relevant check that exercises the changed boundary. Record the snapshot, variant, command, result, and any untested device or service behavior. A successful implementation check is separate from review and release acceptance.

Use native Android/JVM APIs and the project's selected library versions. Keep expected failures typed, programming defects visible, and coroutine cancellation intact. Optional companions are `android-data-layer` for data ownership and `ui-design` for Android error rendering.

## Typed outcomes in the domain module

Use the project's existing result abstraction. This example uses a typed failure parameter for plain Kotlin domain errors. `AppError` avoids the name collision with the nested `Result.Error` class.

```kotlin
interface AppError

sealed interface Result<out D, out E : AppError> {
    data class Success<out D>(val data: D) : Result<D, Nothing>
    data class Error<out E : AppError>(val error: E) : Result<Nothing, E>
}

typealias EmptyResult<E> = Result<Unit, E>

inline fun <T, E : AppError, R> Result<T, E>.map(transform: (T) -> R): Result<R, E> =
    when (this) {
        is Result.Success -> Result.Success(transform(data))
        is Result.Error -> this
    }

inline fun <T, E : AppError> Result<T, E>.onSuccess(action: (T) -> Unit): Result<T, E> =
    apply { if (this is Result.Success) action(data) }

inline fun <T, E : AppError> Result<T, E>.onFailure(action: (E) -> Unit): Result<T, E> =
    apply { if (this is Result.Error) action(error) }

fun <T, E : AppError> Result<T, E>.asEmptyResult(): EmptyResult<E> = map { }

sealed interface DataError : AppError {
    enum class Network : DataError {
        BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, REQUEST_TIMEOUT,
        CONFLICT, PAYLOAD_TOO_LARGE, TOO_MANY_REQUESTS, SERVER_ERROR,
        SERVICE_UNAVAILABLE, NAME_RESOLUTION_FAILED, CONNECTION_FAILED, TLS_FAILURE,
        SERIALIZATION, UNKNOWN
    }
    enum class Local : DataError { DISK_FULL, NOT_FOUND, UNKNOWN }
}
```

Define feature errors beside the owning domain contract, for example `enum class EmailError : AppError { INVALID }`. Choose fail-fast or accumulated validation errors according to the form contract; a single `Result.Error` may contain a structured collection when users need all field errors together.

`onSuccess` and `onFailure` observe an outcome and return the **original result**. They do not recover from errors, replace values, or propagate the result of another operation. Use explicit branching or a deliberately implemented `flatMap`/recovery operation for those behaviors.

## HTTP boundary in the data module

Configure Ktor with `expectSuccess = false` when handling status codes yourself. Do not combine this policy with a validator that throws on the same statuses without adapting the handler. Place both request execution and body decoding inside the protected boundary.

```kotlin
import io.ktor.client.call.NoTransformationFoundException
import io.ktor.client.call.body
import io.ktor.client.network.sockets.ConnectTimeoutException
import io.ktor.client.plugins.HttpRequestTimeoutException
import io.ktor.client.statement.HttpResponse
import io.ktor.serialization.ContentConvertException
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.SerializationException
import java.io.IOException
import java.net.ConnectException
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import java.nio.channels.UnresolvedAddressException
import javax.net.ssl.SSLException

suspend inline fun <reified T : Any> safeCall(
    execute: () -> HttpResponse
): Result<T, DataError.Network> = try {
    responseToResult<T>(execute())
} catch (e: CancellationException) {
    throw e
} catch (e: UnknownHostException) {
    Result.Error(DataError.Network.NAME_RESOLUTION_FAILED)
} catch (e: UnresolvedAddressException) {
    Result.Error(DataError.Network.NAME_RESOLUTION_FAILED)
} catch (e: HttpRequestTimeoutException) {
    Result.Error(DataError.Network.REQUEST_TIMEOUT)
} catch (e: ConnectTimeoutException) {
    Result.Error(DataError.Network.REQUEST_TIMEOUT)
} catch (e: SocketTimeoutException) {
    Result.Error(DataError.Network.REQUEST_TIMEOUT)
} catch (e: ConnectException) {
    Result.Error(DataError.Network.CONNECTION_FAILED)
} catch (e: SerializationException) {
    Result.Error(DataError.Network.SERIALIZATION)
} catch (e: ContentConvertException) {
    Result.Error(DataError.Network.SERIALIZATION)
} catch (e: NoTransformationFoundException) {
    Result.Error(DataError.Network.SERIALIZATION)
} catch (e: SSLException) {
    Result.Error(DataError.Network.TLS_FAILURE)
} catch (e: IOException) {
    Result.Error(DataError.Network.CONNECTION_FAILED)
}

suspend inline fun <reified T : Any> responseToResult(
    response: HttpResponse
): Result<T, DataError.Network> = when (response.status.value) {
    in 200..299 -> {
        if (T::class == Unit::class) {
            @Suppress("UNCHECKED_CAST")
            Result.Success(Unit as T)
        } else {
            Result.Success(response.body<T>())
        }
    }
    400 -> Result.Error(DataError.Network.BAD_REQUEST)
    401 -> Result.Error(DataError.Network.UNAUTHORIZED)
    403 -> Result.Error(DataError.Network.FORBIDDEN)
    404 -> Result.Error(DataError.Network.NOT_FOUND)
    408 -> Result.Error(DataError.Network.REQUEST_TIMEOUT)
    409 -> Result.Error(DataError.Network.CONFLICT)
    413 -> Result.Error(DataError.Network.PAYLOAD_TOO_LARGE)
    429 -> Result.Error(DataError.Network.TOO_MANY_REQUESTS)
    503 -> Result.Error(DataError.Network.SERVICE_UNAVAILABLE)
    in 500..599 -> Result.Error(DataError.Network.SERVER_ERROR)
    else -> Result.Error(DataError.Network.UNKNOWN)
}
```

This Android Ktor/OkHttp example maps the selected engine's known transport exceptions. Confirm the resolved API and exception types before adapting it. Keep unexpected failures visible. Describe a DNS failure as a problem reaching the service. Return safe, localized errors to users and keep raw exceptions, bodies and credentials out of the presentation layer.

Use standard Ktor request functions rather than overloads named `get`/`post` that can resolve ambiguously. Configure a trusted HTTPS base URL once with Ktor's URL builder; define whether routes are relative to its path prefix. Avoid string concatenation and `contains(BASE_URL)` checks. Test leading/trailing slashes, path parameters, queries, and any permitted absolute URLs. Apply the approved origin and credential policy to the final request and each redirect hop. In a controlled fixture, inspect destination and headers after a cross-origin redirect. Reject an invalid TLS certificate without weakening trust checks.

```kotlin
import io.ktor.client.request.get

// A data-source method; client is injected and base URL configuration is shared.
suspend fun loadNotes(client: io.ktor.client.HttpClient): Result<List<NoteDto>, DataError.Network> =
    safeCall { client.get("notes") }
// Import io.ktor.client.request.get. NoteDto is the feature's @Serializable DTO.
```

For a bodyless endpoint request `safeCall<Unit> { ... }`; do not attempt to decode an empty body as a DTO. For authenticated calls, distinguish an expired session from connectivity failure and stop refresh loops after a rejected refresh.

## Storage and UI mapping

Catch storage-specific exceptions in the data layer, rethrow cancellation, and map the actual driver's known failures. `android.database.sqlite.SQLiteFullException` applies to the Android framework driver; a different SQLite driver can expose different exceptions. Do not classify every database failure as disk-full, nor catch arbitrary defects as storage errors.

Map each user-visible domain error to localized text in its presentation owner. Reuse existing conventions such as `R.string.*`, `UiText` or a shared presentation module when present. Internal retry signals need no user-facing string. Keep logs useful and redacted; do not use unconditional `printStackTrace()` as production logging.

## Failure classification and retry contract

TLS trust and hostname failures require valid trust configuration. Treat them as terminal for the current attempt. Keep retry policy with the operation and check the worker, repository and client together so their attempts stay bounded. After a POST timeout, resolve the potentially committed operation through the supported status or idempotency contract before resubmitting.

The enum helper is suitable when status alone determines the result. For an operation that honors `Retry-After` on 429 or 503, read `response.headers[HttpHeaders.RetryAfter]` while mapping the response. Carry the status category and the parsed retry hint in the data-layer outcome used by the retry owner. Keep transport details out of UI messages. Handle delay-seconds and HTTP-date with the project's parser and injected clock. If the requested wait exceeds the remaining retry budget, defer or stop the operation rather than retrying earlier. Use the documented fallback when the header is absent or invalid. [Retry-After semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3)

For an application-owned deadline that the contract exposes as a typed failure, use `withTimeoutOrNull` around the entire operation at the deadline owner and map its null timeout to the appropriate error when the operation otherwise returns a non-null outcome. Let parent cancellation and timeouts owned by another scope propagate. The HTTP client's own timeout exceptions still belong to the transport mapping. For streaming responses, consume or transfer the body within its supported request/client lifetime and close it on exit. A bodyless success needs a supported response contract. HTTP 202 acknowledges acceptance for processing. Verify the final operation state through the documented completion path before showing a completed result.

## Verify

Exercise status mapping, DNS/connection/timeout failures, malformed success JSON, bodyless success, cancellation, rejected refresh, and unknown statuses. If the retry contract uses server hints, cover both header forms, invalid values and a wait beyond the budget. Exercise a locally owned deadline and external cancellation separately when both can reach the operation. The optional `android-integration-testing` skill covers transport fixtures.

Sources: [Ktor response validation](https://ktor.io/docs/client-response-validation.html), [Ktor timeouts](https://ktor.io/docs/client-timeout.html), [Android coroutine practices](https://developer.android.com/kotlin/coroutines/coroutines-best-practices).
