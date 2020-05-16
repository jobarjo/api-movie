# Movie API

API retuning movie information from IMDB and film affinity.

## API endpoints

- `GET /rating/:imdbId`

## Infrastructure

This service consists of the following stack(s):

- ecr.yml: deploys an ECR repository for hosting the image of the service
- ecs.yml: deploys the API service

## Depedencies

None.

## Deployment

Manual.

## Monitoring

None.

## Tests

None.

---

## Notes

None.

## Todo list

* Set up a custom VPC with custom public subnets for the API
* ECR stack 
    - delete name (best practice as a name limits update possibilities) and review CF nested stacks / outputs best practices
    - add lifecyle policy
* Review eslint policy with airbnb
* Add unit tests
* Scaling: ELB + route53 DNS alias