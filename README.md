# ww-code-test

In this test you will find a wide cross section of the type of code you will be exposed to at Wealth Wizards.

Most candidates complete the test in under 2 hours, however if 
you should wish to continue beyond that we welcome you to do so and this will have no impact on your submission.
 
## Instructions

Click the **Use this template** button above to create a private repository in your own github account and invite github users [@mrwithersea](https://github.com/mrwithersea) and [@rob1256](https://github.com/rob1256) as collaborators on your repo.
 
**IMPORTANT: Please commit your work on a new branch and raise a pull request against the master branch of your repo and add us as reviewers. Please add a simple description to your PR outlining which parts of the test have been completed and any comments you feel support your submission.**

Start the app by running the following commands:
 
 ```
 yarn
 ```
 
 ```
 yarn dev
 ```

The placeholder application can be browsed to on:
 
```
http://localhost:8080
```

There is a single API route accessible through the following request:

```
curl -X POST http://localhost:8080/v1/national-insurance -H 'Content-Type: application/json' -d '{"income": 1234}'
```

### Part A. Fix the unit tests that are broken

Run this command to see the result of the unit tests, you will need to implement the empty function at `line:27` of `src/services/national-insurance.js` in order to make the failing unit tests pass.

```
yarn test:unit
```

### Part B. Fix the feature tests that are broken after completion of Part A.

Run this command to see the result of the feature tests, you will need to implement the missing feature of the API that is indicated by the failing tests.

```
yarn test:feature
```
 

### Part C. Build a simple React application that should allow a user to compare their national insurance contributions between 2018/19 and 2019/20

Run this command to run the application locally.

```
yarn dev
```

Alternatively you can run this command to bring the application up in the provided docker container:

```
make dev
```

There are a number of packages pre-installed with this codebase, feel free to use any you see fit or add any of your own choosing.

Good luck

---

#### _Caveats_

This code test was written on macOS but will run natively on Windows 10.

When running on Windows 10 our preference was to follow [this guide](https://www.windowscentral.com/how-install-bash-shell-command-line-windows-10) to using Windows Subsystem for Linux and installing Bash through the Ubuntu distro in the Windows Store.

Users of Ubuntu should be aware that in some versions of the distro there are extra hurdles around the aliasing of the `yarn` command by the `cmdtest` library and the use of `nodejs` rather than `node`, [this page](https://yarnpkg.com/lang/en/docs/install/#debian-stable) provides details on rectifying these problems.

This code test requires Node.js 10.x (which is in LTS) and we advocate using a node version management tool such as [n](https://github.com/tj/n) to help in managing your node versions.
