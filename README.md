# Movie API

API retuning movie information from IMDB and film affinity.

## API endpoints

- `GET /rating/:imdbId`

## Infrastructure

This service consists of the following stack(s):

- ecr.yml: deploys an ECR repository for hosting the image of the service
- ec2.yml: deploys the API service inside of an EC2 instance

## Depedencies

None.

## Deployment

Manual.

- each push will trigger [codeBuild](ci/codebuild/).

## Monitoring

None.

## Tests

None.

---

## Notes

None.

## Todo list

* Set up a custom VPC with custom public subnets for the API
* Pipeline.yml
  - Create a machine user to limit access to github
  - webhook: secure webhook from [github](https://developer.github.com/webhooks/securing/)
* Review eslint policy with airbnb
* Add unit tests
* Scaling: ELB + route53 DNS alias