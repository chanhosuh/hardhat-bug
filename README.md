# hardhat-bug

## Steps to reproduce:

1. Clone repo

2. `yarn` to install the deps

3. `yarn hardhat test` to run the test in `test/bug.js`

```console
$ yarn hardhat test
yarn run v1.22.5
$ <redacted path>/hardhat-bug/node_modules/.bin/hardhat test


  MWE for hardhat bug
    ✓ Deployed address should depend only on impersonated account and its nonce (1322ms)


  1 passing (1s)

✨  Done in 2.63s.
```

4. `yarn add hardhat@2.6.6` (any 2.6.x version will have the same issue)

```console
$ yarn add hardhat@2.6.6
yarn add v1.22.5
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ hardhat@2.6.6
info All dependencies
├─ @ethereumjs/vm@5.5.3
└─ hardhat@2.6.6
✨  Done in 5.39s.
```

5. `yarn hardhat test` now fails

```console
$ yarn hardhat test
yarn run v1.22.5
$ <redacted path>/hardhat-bug/node_modules/.bin/hardhat test


  MWE for hardhat bug
    1) Deployed address should depend only on impersonated account and its nonce


  0 passing (2s)
  1 failing

  1) MWE for hardhat bug
       Deployed address should depend only on impersonated account and its nonce:

      AssertionError: expected '0xb2E58Fb80FB019040C504938c56B4c5649c77981' to equal '0xFbF6c940c1811C3ebc135A9c4e39E042d02435d1'
      + expected - actual

      -0xb2E58Fb80FB019040C504938c56B4c5649c77981
      +0xFbF6c940c1811C3ebc135A9c4e39E042d02435d1

      at Context.<anonymous> (test/bug.js:45:30)
      at processTicksAndRejections (internal/process/task_queues.js:97:5)
      at runNextTicks (internal/process/task_queues.js:66:3)
      at listOnTimeout (internal/timers.js:518:9)
      at processTimers (internal/timers.js:492:7)



error Command failed with exit code 1.
```
