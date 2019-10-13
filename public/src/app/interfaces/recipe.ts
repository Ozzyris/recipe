export interface recipe_interface {
	id: string,
	title: string,
	url: string,
	illustration: string,
	summary: string,
	time: number,
	yield: string,
	tips: string,
	edit_time: number,
	tags: Array<string>,
	ingredients: Array<ingredients_interface>,
	preparations: Array<preparation_interface>
}

export interface ingredients_interface {
	name: string,
	order: number,
	id: string
}

export interface preparation_interface {
	step: string,
	order: number,
	id: string
}
