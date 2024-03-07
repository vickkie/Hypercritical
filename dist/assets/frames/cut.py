from moviepy.editor import VideoFileClip

# Load the video
video = VideoFileClip("hypercritical.mp4")

# Cut the video from 10 seconds to 20 seconds
cut_video = video.subclip(15, 17)

# Save the cut video
cut_video.write_videofile("hypercritical.mp4")
