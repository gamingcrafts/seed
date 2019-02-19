import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSettings,updateTextBox,toogleCheckBox,updateSettings,updateNumberBox
} from '../store/actions/rule-engine-actions';
import {
  EuiFieldText,
  EuiPanel,
  EuiForm,
  EuiFormRow,EuiSwitch,EuiButton,EuiFieldNumber

} from '@elastic/eui';
class RuleEngine extends Component {
  
  onTextBoxChange = (e, type, item) => {
    this.props.updateTextBox({
      event: e,
      item: item,
      type: type
    })
}
onNumberBoxChange = (e, type, item) => {
  this.props.updateNumberBox({
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
      
  
      <EuiPanel style={{ maxWidth: 600 }}>
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
          <EuiFormRow label="Hide Conj for One">
          <EuiSwitch
          
          checked={settings['hideConjForOne']}
          onChange={(e) => this.onCheckBoxChange(e,'hideConjForOne')}
        />
          </EuiFormRow>
          <EuiFieldNumber
          
         
          value={settings['maxLabelsLength'] ? settings['maxLabelsLength']: 0}
          onChange={(e) => this.onNumberBoxChange(e,'maxLabelsLength')}
          compressed
        />
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
    getSettings,updateTextBox,toogleCheckBox,updateSettings,updateNumberBox
  }
  export default connect(mapStateToProps, actions)(RuleEngine)