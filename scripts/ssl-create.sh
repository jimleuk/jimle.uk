#!/bin/bash
# Custom SSL for S3 website using letsencrypt
# - assumes certbot is installed
# - assumes certbot-s3front is installed (https://github.com/dlapiduz/certbot-s3front)

certbot --agree-tos -a certbot-s3front:auth \
--certbot-s3front:auth-s3-bucket $AWS_S3_BUCKET \
--certbot-s3front:auth-s3-region $AWS_REGION \
-i certbot-s3front:installer \
--certbot-s3front:installer-cf-distribution-id $AWS_CLOUDFRONT_DID \
-d $DOMAIN >> certbot.log