# Recipe
A cooking recipe manager with some taste!

## Front-end
- [x] add the edit button
	- [x] update the parameter of the link
- [x] fix the last updated 50 years ago
- [x] Add error message if email or password is invalid
- [x] update menu when logged in or logged out
- [x] Vérifier le compteur de recettes
- [ ] Add uploading file
	- [x] Add error message for upload file
	- [ ] Add loading gauge
- [ ] Add logout if session expired

## server
- [x] get recipe_id from server
- [x] upload file
	- [x] check file on server
	- [x] Delete previuous file before uploading new one

## New features
- [ ] Categories of tags
	- [ ] Redesign tags structure (table de tags et association de produits & tags)
	- [ ] Featured tags on front end
	- [ ] Tags page when you click on the featured tags.
	- [ ] Create unspash illustration for each tag, admin can refresh them.
	- [ ] Query in url for tags
- [ ] pagination of the recipes
	- [ ] udpate server to only send X amount of repicpe with pagination ( merge with query ).
	- [ ] implement angular natif lazyloading.
