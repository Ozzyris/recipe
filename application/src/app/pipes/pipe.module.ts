import { NgModule } from '@angular/core';

//Pipe
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { SearcherPipe } from './searcher/searcher.pipe';
import { MomentPipe } from './moment/moment.pipe';


@NgModule({
    declarations: [
        SanitizerPipe,
        SearcherPipe,
        MomentPipe
    ],
    imports: [

    ],
    exports: [
        SanitizerPipe,
        SearcherPipe,
        MomentPipe
    ]
})
export class PipesModule{}