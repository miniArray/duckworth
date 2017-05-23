> topic music
  + {keep} play (music|some music|something)
  - {@__AFFERMATIVE__} ^music('shuffle', '')

  + {keep} play something (*)
  - {@__AFFERMATIVE__} ^music('genre', <cap>)

  + {keep} play (*)
  - {@__AFFERMATIVE__} ^music('artist', <cap>)

  + {keep} __AFFERMATIVE__
  - sure, just a moment
  - sure, let me pull that up for you
  - sounds like a plan
< topic
