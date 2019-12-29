import { NgModule } from '@angular/core';

//Pipe
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { SearcherPipe } from './searcher/searcher.pipe';


@NgModule({
    declarations: [
        SanitizerPipe,
        SearcherPipe
    ],
    imports: [

    ],
    exports: [
        SanitizerPipe,
        SearcherPipe
    ]
})
export class PipesModule{}