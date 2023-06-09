# search-test

## Prepare
Download embeddings and add the file to unsplash-dataset folder
link: https://drive.google.com/drive/folders/1WQmedVCDIQKA2R33dkS1f980YsJXRZ-q?usp=sharing


## Start server. 
```sh
uvicorn main:app --reload 
```

## Get photo IDs. 
http://127.0.0.1:8000/search/shiba_inu_play_on_the_beach

## Visualize photos. 
```py
from IPython.display import Image
from IPython.core.display import HTML

def display_photo(photo_id):
  # Get the URL of the photo resized to have a width of 320px
  photo_image_url = f"https://unsplash.com/photos/{photo_id}/download?w=320"

  # Display the photo
  display(Image(url=photo_image_url))

  # Display the attribution text
  display(HTML(f'Photo on <a target="_blank" href="https://unsplash.com/photos/{photo_id}">Unsplash</a> '))
  print()
  
p_id = 'NXF9JBcA1GU'
display_photo(p_id)
```
