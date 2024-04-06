import cv2

# Open the video file
video_capture = cv2.VideoCapture('hypercritical.mp4')

frame_count = 0

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    # Save the frame as a WebP image
    frame_filename = f'{frame_count:04d}.webp'
    cv2.imwrite(frame_filename, frame, [cv2.IMWRITE_WEBP_QUALITY, 100])  # Set WebP quality (0-100)

    frame_count += 1

# Release the video file
video_capture.release()
cv2.destroyAllWindows()