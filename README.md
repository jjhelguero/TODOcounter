# todo-counter

> count todo comments in specified directory

## Install

    npm install -d todo-counter

## Todo Count

The following will search for todo comments in `foo/bar` directory and a subdirectories in files matching the `.js` extension.

    npx todo-counter 'foo/bar' '.js'

Examples of TODO's that will be counted:

```
// TODO: This thing needs fixing
//todo: this is be counted
// todo this will be counted
```
## Skipped Test Count

The following will search for skipped tests in `foo/bar` directory and a subdirectories in files matching the `.js` extension.

    npx skipped-tests-counter 'foo/bar' '.js'

Examples of Skipped Tests that will be counted:

```
// SKIP: This thing needs fixing
//skip: this is be counted
// skip this will be counted
```


## Expects

The following table structures are expected in your `README` file with `Date` cells including a `<date>` tag and the `Todo Count`/`Skipped Tests Count`
cells including a `<todoCounter>`/`<skippedTestsCounter>` tag. If one is not found, the counter will append one at the end of the `README` file.

| Date | Todo Count |
| :---:| :---:|
|<date>02/02/02|<todoCounter>2|
|<date>03/03/03|<todoCounter>3|
|<date>04/04/04|<todoCounter>4|
|<date>05/05/05|<todoCounter>5|
|<date>06/06/06|<todoCounter>6|
|<date>07/07/07|<todoCounter>7|
|<date>08/08/08|<todoCounter>8|
|<date>09/09/09|<todoCounter>9|
|<date>10/10/10|<todoCounter>10|
|<date>08/23/23|<todoCounter>11|


| Date | Skipped Tests Count |
| :---:| :---:|
|<date>01/01/01|<skippedTestsCounter>1|
|<date>02/02/02|<skippedTestsCounter>2|
|<date>03/03/03|<skippedTestsCounter>3|
|<date>04/04/04|<skippedTestsCounter>4|
|<date>05/05/05|<skippedTestsCounter>5|
|<date>06/06/06|<skippedTestsCounter>6|
|<date>07/07/07|<skippedTestsCounter>7|
|<date>08/08/08|<skippedTestsCounter>8|
|<date>09/09/09|<skippedTestsCounter>9|
|<date>10/10/10|<skippedTestsCounter>10|
