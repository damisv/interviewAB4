import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIType, Filters, User} from '../../models';
import {StackExchangeService} from '../../services';

/**
 * @title Retrieve user details based on the id provided
 */
@Component({
  selector: 'app-details-with-id',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  // MARK: Properties
  currentStep = 0;
  user: User;
  defaultAvatar = '../../../assets/defaultAvatar.png';

  // MARK: Initializations
  constructor(private route: ActivatedRoute,
              private stackService: StackExchangeService) {
    stackService.getUser(new Filters(APIType.stackoverflow), route.snapshot.params['id'])
                .subscribe( (user) => this.user = user );
  }

  // MARK: Public methods
  public setStep(index: number) { this.currentStep = index; }

  public nextStep() { this.currentStep++; }

  public prevStep() { this.currentStep--; }
}
