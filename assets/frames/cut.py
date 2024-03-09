from moviepy.editor import VideoFileClip

# Load the video
video = VideoFileClip("la-reel--min.mp4")

# Cut the video from 10 seconds to 20 seconds
cut_video = video.subclip(48.7, 49.9)

# Save the cut video
cut_video.write_videofile("mid-hype.mp4")

# environment python
#source hyper-cut/bin/activate-use in cmd, 
