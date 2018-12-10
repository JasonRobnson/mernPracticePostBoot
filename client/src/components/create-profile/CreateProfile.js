import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("You've clicked the submit button");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    // select options for status
    const options = [
      {
        label: '* Select Personal Status',
        value: 0
      },
      { label: 'Single', value: 'Single' },
      { label: 'Married', value: 'Married' },
      { label: 'UnCertain', value: 'UnCertain' },
      { label: 'Open', value: 'Open' },
      { label: 'Complicated', value: 'Complicated' },
      { label: 'Panaramic', value: 'Panaramic' },
      { label: 'Who knows', value: 'Who knows' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile!
              </p>
              <small className="d-block pb-3">*=required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  errors={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, "
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  errors={errors.status}
                  info="What's your current situation?"
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                  info=" Are you employed? "
                />{' '}
                <TextFieldGroup
                  placeholder=" Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={errors.website}
                  info="Share your professional website. "
                />{' '}
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                  info="Please share your location (eg Detroit, MI)"
                />{' '}
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={errors.skills}
                  info="comma seperated values (eg Cooking,Bowling,Yachting,) "
                />
                <TextFieldGroup
                  placeholder="Yoursite ScreenName"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  errors={errors.githubusername}
                  info="Share your professional website. "
                />{' '}
                <TextAreaFieldGroup
                  placeholder="Your Bio here....."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  errors={errors.bio}
                  info="Please share a blurb about yourself. "
                />{' '}
                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(previousState => ({
                        displaySocialInputs: !previousState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add social network links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps)(CreateProfile);
