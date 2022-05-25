> Date: 10.12.2021r.

# Jest configuration and a collection coverage report

## Status

accepted

## Context

We want to use GitLab premium-tier features in our frontend repositories and start propagating changes regarding our position for unit testing. An increasing amount of unit tests is one of our goals for future projects. Features are listed below:

- [Test coverage result to a merge request](https://docs.gitlab.com/ee/ci/pipelines/settings.html#add-test-coverage-results-to-a-merge-request)
- [Test coverage visualization](https://docs.gitlab.com/ee/user/project/merge_requests/test_coverage_visualization.html)
- [Unit test reports](https://docs.gitlab.com/ee/ci/unit_test_reports.html)

We could take a model from backend boilerplate like [here](https://gitlab.com/merixstudio/pts/fastapi-project-template/-/blob/master/.gitlab-ci.yml).

We are collecting coverage reports to our GitLab features. For the Cobertura, we are using built-in reporters in jest. But for the junit we have to use the additional plugin jest-junit to generate coverage reports with junit structure.

In the GitLab-ci test job, we have to add a custom `coverage` key with custom value taken from the [Gitlab issue](https://gitlab.com/gitlab-org/gitlab-foss/-/issues/45556#note_98659608). It allows parsing coverage stdout reports for Gitlab.

## Decision

We want to bond more to unit tests. Features like this could be helpful to maintain the code well including writing tests. Also, we believe that it could easily show the real problem in some projects and give arguments for the clients to implement unit tests.

## Consequences

Right now we can see the artefacts after the unit test job in CI. It should contain 2 files and the developer shouldn't bother about this. The developer should see only helpful messages like in the mentioned feature links from the "Context" section.

We have to configure `coveragePathIgnorePatterns` jest option per project.


