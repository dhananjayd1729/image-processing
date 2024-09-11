# Image Processing

This repository is about processing images asynchronously and notifying a third party when the processing is done.

## Image Processing Service Interaction

- Get the CSV file of products from the client which will be having multiple images and will be parsed. Once server reads the CSV file it creates database entries for the same and processes images asynchronously. 

## Webhook Handling 

- Processes callbacks from the image processing service.

## Database Schema and Interaction

- Schema will contain serial number, product name, input urls array which we want to process, output urls array to store processed images, status of image-processing, requestID for particular CSV file.
- Stores entries created for products from the CSV file and tracks the status of each processing request.

## API Endpoints

- Upload API: 
    - method: `POST` 
    - request: CSV file
    - response: unique `requestID`
- Status API: 
    - method: `GET` 
    - request: `requestID` in params
    - response: Processing status for `requestID`

## Asynchronous Workers

- We used asynchronous behavious of javascript to process the images but it will be a bottleneck for the system as more requests comes for processing.
- We tried to use BullMQ we will push the code for the same soon. 
- One more thing can cause an issue which is images itself. We can store images on blob-store (e.g. AWS-S3) instead of storing images as it is.
