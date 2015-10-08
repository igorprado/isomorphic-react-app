import sample from 'lodash/collection/sample';
import take from 'lodash/array/take';

import data from 'data/users.json';

class UsersActions {

  constructor() {
    this.generateActions(
      'remove', 'fetchSuccess', 'addSuccess',
      'fetchBySeedSuccess'
    );
  }

  add() {
    const self = this;
    const promise = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();
      setTimeout(() => {
        // Randomize this xhr
        const number = Math.floor(Math.random() * (2 - 10)) + 2;

        if (number % 2 === 0) {
          const user = sample(data.users);
          this.actions.addSuccess(user);
          this.alt.getActions('requests').success({
            title: user.user.email + ' added!'
          });
          return resolve();
        } else {
          this.alt.getActions('requests').fail({
            title: 'Unable to add the user.',
            autoDismiss: 0,
            action: {
              label: 'Try again',
              callback: function() {
                self.actions.add();
              }
            }
          });
          return resolve();
        }
      }, 300);
    };
    this.alt.resolve(promise);
  }

  fetch() {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.fetchSuccess(take(data.users, 10));
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

  fetchBySeed(seed) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        const user = data.users.find((u) => u.seed === seed);
        this.actions.fetchBySeedSuccess(user);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };

    this.alt.resolve(promise);
  }

}

export default UsersActions;
