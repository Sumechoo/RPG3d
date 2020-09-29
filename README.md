# RPG3d

Game engine influenced by Id software's "RPG" engine for J2ME and Legacy IOS versions [https://en.wikipedia.org/wiki/Wolfenstein_RPG]. Most famous games: Doom RPG series, Orc and Elves RPG series, Wolfenstein RPG.
Currently in development phase. Supports rendering of Plane and Box geometries.

Game type: Turn based RPG, Turn based FPS, Visual Novel;
Target platform: Web only;

Currently supports:
- NPC interaction [Partial]
- Level path finding [Partial]
- Level configs in separate file
- Instanced buffer geometry [Partial]

Development wishlist:
- Instanced mesh rendering [in Dev]
- Configuration documentation
- Configurable UI system
- Configurable audio mixer
- Visual editor
- Importing of external resources
- Engine code as External module
- Shadow casting / receiving
- Disposing of resources
- Post processing
- Day/Night cycle control

How to run:
- yarn install
- yarn start
(Change level config in the `MainRenderer` file to use custom level configuration)
