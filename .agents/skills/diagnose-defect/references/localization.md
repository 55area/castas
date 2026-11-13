# Localize a reproducible defect

Choose the cheapest safe observation that would distinguish the remaining explanations. Record what would falsify each one.

## Bisect a regression

Find known-good and known-bad revisions that actually reproduce their labels with the same command and representative data. Use a disposable checkout, pin the toolchain and fixture, and confirm that setup failures are reported separately from the target assertion. For `git bisect run`, return 0 for a good revision, a deliberate failure status for the reproduced defect, and 125 when the revision cannot be classified. Classify intermittent revisions only when the chosen repetition and evidence are sufficient. Inspect the candidate change and reproduce on both sides of it before claiming a cause. Look at other callers of the same boundary when they could share the failure.

## Reduce an input or event trace

Preserve a working control. Remove one group of input fields, events, or configuration differences at a time and rerun the same probe. Keep a reduction only when it reproduces the same failure, including the first incorrect boundary. An invalid input rejected earlier in the path gives no evidence about the original trigger. In a concurrency failure, preserve the required ordering with a controlled barrier or test scheduler where possible. Keep the original scenario for the final verification when the reduced case leaves out meaningful production conditions.
