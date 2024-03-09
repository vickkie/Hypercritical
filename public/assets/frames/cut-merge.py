# from moviepy.editor import VideoFileClip, concatenate_videoclips

# # Load the video
# video = VideoFileClip("goat.mp4")

# # Cut the video into segments
# segment1 = video.subclip(0, 4)
# segment2 = video.subclip(8, 10)

# # Combine the segments
# combined_video = concatenate_videoclips([segment1, segment2])

# # Save the combined video
# combined_video.write_videofile("combined-video.mp4")

from moviepy.editor import VideoFileClip

# Load the video
clip = VideoFileClip("world.mp4")

# Adjust resolution and frame rate if necessary
# For example, to set a resolution of 1280x720 and a frame rate of 30 fps
clip = clip.resize(width=1280, height=720).set_duration(clip.duration).set_fps(30)

# Save the adjusted clip
clip.write_videofile("adjusted_world.mp4")

