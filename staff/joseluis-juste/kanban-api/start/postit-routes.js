const Route = use('Route')

Route.get('/:userId', 'PostitController.index').prefix('postits')
Route.post('/', 'PostitController.create').prefix('postit').formats(['json']).validator('postit/PostIt')
Route.put('/:postitId', 'PostitController.update').prefix('postit').formats(['json']).validator('postit/PostIt')
Route.get('/:postitId/:userId', 'PostitController.find').prefix('postit').formats(['json'])
Route.delete('/:postitId/:userId', 'PostitController.delete').prefix('postit')