import sample from 'lodash/collection/sample';
import take from 'lodash/array/take';

import data from 'data/users.json';

class UsersActions {

  constructor() {
    this.generateActions(
      'remove', 'fetchSuccess', 'fetchBySeedSuccess'
    );
  }

  add() {
    const promise = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();
      setTimeout(() => {
        // Randomize this xhr
        const user = sample(data.users);

        if (Math.random() > 0.5) {
          this.actions.addSuccess(user);
          this.alt.getActions('requests').success();
          return resolve();
        } else {
          this.alt.getActions('requests').fail();
          this.actions.addError(user);
          return resolve();
        }
      }, 300);
    };
    this.alt.resolve(promise);
  }

  addSuccess(user) {
    this.alt.getActions('notification').success({
      title: 'User added',
      message: `${user.user.email} was added!`
    });

    return { user };
  }

  addError(user) {
    this.alt.getActions('notification').error({
      title: 'Error adding user',
      message: `${user.user.email} couldn't be added.`
    });
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
