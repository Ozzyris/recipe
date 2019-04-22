export interface recipe_interface {
	title: string,
	url: string,
	summary: string,
	time: number,
	yield: string,
	tips: string,
	edit_time: number,
	tags: Array<string>,
	ingredients: Array<ingredients_interface>,
	preparation: Array<preparation_interface>
}

export interface ingredients_interface {
	name: string,
	order: number,
	id: string
}

export interface preparation_interface {
	name: string,
	order: number,
	id: string
}
