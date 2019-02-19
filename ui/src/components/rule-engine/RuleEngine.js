import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSettings,updateTextBox,toogleCheckBox,updateSettings
} from '../store/actions/rule-engine-actions';
import {
  EuiFieldText,
  EuiPanel,
  EuiForm,
  EuiFormRow,EuiSwitch,EuiButton

} from '@elastic/eui';
class RuleEngine extends Component {
  
  onTextBoxChange = (e, type, item) => {
    this.props.updateTextBox({
      event: e,
      item: item,
      type: type
    })
}
onCheckBoxChange = (e, type,item) => {
  this.props.toogleCheckBox({
    event: e,
    item: item,
    type: type
  })
}

updateSettings = () => {
  let{settingsId,settings} = this.props.RuleEngineReducer;
  this.props.updateSettings({
    id: settingsId,
    properties:settings,
    
  })
}
render(){
  const {settings} = this.props.RuleEngineReducer;
  if(settings!=={}){
    console.log(settings);
  }
    return( 
      
  
      <EuiPanel style={{ maxWidth: 300 }}>
        <EuiButton
      fill
      onClick={this.updateSettings}
      color="secondary">Save</EuiButton>
        <EuiForm>
          <EuiFormRow
            label="Render Size"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            placeholder="Render Size"
            value={settings['renderSize'] ? settings['renderSize']: ''}
            onChange={(e) => this.onTextBoxChange(e,'renderSize')}/>
          </EuiFormRow>
          <EuiFormRow>
          <EuiSwitch
          label="hideConjForOne"
          checked={settings['hideConjForOne']}
          onChange={(e) => this.onCheckBoxChange(e,'hideConjForOne')}
        />
          </EuiFormRow>
        </EuiForm>
      </EuiPanel>
    )
}
}
const mapStateToProps = ({
    RuleEngineReducer
  }) => {
    return {
        RuleEngineReducer
    }
  }
  const actions = {
    getSettings,updateTextBox,toogleCheckBox,updateSettings
  }
  export default connect(mapStateToProps, actions)(RuleEngine)