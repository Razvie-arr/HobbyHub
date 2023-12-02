#!/bin/bash

url='localhost:4000'
content_type='Content-Type: application/json'
query='{"query":"mutation Mutation {\n askForFeedback\n}","variables":{}}'

curl --location "$url" \
     --header "$content_type" \
     --data "$query"
