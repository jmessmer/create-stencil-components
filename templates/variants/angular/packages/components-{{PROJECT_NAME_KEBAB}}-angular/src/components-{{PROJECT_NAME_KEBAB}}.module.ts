import { APP_INITIALIZER, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives/generated';
import { defineCustomElements } from '@{{ORGANIZATION_NAME}}/components-{{PROJECT_NAME_KEBAB}}-core/loader';

@NgModule({
    declarations: [...DIRECTIVES],
    exports: [...DIRECTIVES],
    imports: [CommonModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: () => defineCustomElements,
            multi: true,
        }
    ],
})

export class Components{{PROJECT_NAME_PASCAL}}Module {}