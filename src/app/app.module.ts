import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, FooterComponent, SharedModule} from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagerSearchModelComponent } from './shared/components/projects/manager-search-model/manager-search-model.component';
import { ProjectSearchModelComponent } from './shared/components/tasks/project-search-model/project-search-model.component';
import { TaskSearchModelComponent } from './shared/components/tasks/task-search-model/task-search-model.component';
import { UserSearchModelComponent } from './shared/components/tasks/user-search-model/user-search-model.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule
  ],
  entryComponents: [
    ManagerSearchModelComponent,
    ProjectSearchModelComponent,
    TaskSearchModelComponent,
    UserSearchModelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
