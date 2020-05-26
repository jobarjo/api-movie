# be-api-movie

API retuning movie information from IMDB and film affinity.

## API endpoints

- `GET /rating/:imdbId`

## Infrastructure

This service consists of the following stack(s):

- `00-pipeline.yml` - stack deploying the aws codepipeline which in turn will deploy the other stacks
- `01-infrastructure` - stack deploying aws components such as ECR repo, ECS cluster, and ELB
- `02-build.yml` - deploys an AWS codebuild project based on `buildspec.yml` in the root directory that will build the docker image and push it to ECR
- `03-service.yml` - deploys a CF stack with an ECS task definition

## Depedencies

- This repo requires output variables from [be-infrastructure-networking](https://github.com/wantedmedia/be-infrastructure-networking)

## Deployment

This project is deployed via AWS Code pipeline.

Simpliest way is to launch the CF stack `00-pipeline.yml` via CloudFormation, the other stacks will be deployed automatically.

A github webhook has been configured so that any push to the repo will then trigger the pipeline to update.

## Monitoring

None.

## Tests

None.

---

## Notes

None.

## Todo list

* Pipeline.yml
  - Create a machine user to limit access to github
  - use secret manager for github token
  - add grafana dashboards
  - move to Publicly Exposed Service with Private Networking - explained [here](https://github.com/awslabs/aws-cloudformation-templates/tree/master/aws/services/ECS)
* Review eslint policy with airbnb
* Add unit tests
* Scaling: route53 DNS alias