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
  let{settings} = this.props.RuleEngineReducer;
  this.props.updateSettings(settings);
}
render(){
  const {settings} = this.props.RuleEngineReducer;
  if(settings!=={}){
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
          <EuiFormRow
            label="Field Separator Display"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            placeholder="Render Size"
            value={settings['fieldSeparatorDisplay'] ? settings['fieldSeparatorDisplay']: ''}
            onChange={(e) => this.onTextBoxChange(e,'fieldSeparatorDisplay')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Value Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['valueLabel'] ? settings['valueLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'valueLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Value Place Holder"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['valuePlaceholder'] ? settings['valuePlaceholder']: ''}
            onChange={(e) => this.onTextBoxChange(e,'valuePlaceholder')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Field Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['fieldLabel'] ? settings['fieldLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'fieldLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Operator Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['operatorLabel'] ? settings['operatorLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'operatorLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Field Placeholder"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['fieldPlaceholder'] ? settings['fieldPlaceholder']: ''}
            onChange={(e) => this.onTextBoxChange(e,'fieldPlaceholder')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Operator Placeholder"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            placeholder="Render Size"
            value={settings['operatorPlaceholder'] ? settings['operatorPlaceholder']: ''}
            onChange={(e) => this.onTextBoxChange(e,'operatorPlaceholder')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Delete Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            placeholder="Render Size"
            value={settings['deleteLabel'] ? settings['deleteLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'deleteLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Add Group Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['addGroupLabel'] ? settings['addGroupLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'addGroupLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Add Rule Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['addRuleLabel'] ? settings['addRuleLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'addRuleLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Not Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['notLabel'] ? settings['notLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'notLabel')}/>
          </EuiFormRow>
          <EuiFormRow
            label="Delete Group Label"
            helpText="Help text about render size"
            compressed>
            <EuiFieldText
            value={settings['delGroupLabel'] ? settings['delGroupLabel']: ''}
            onChange={(e) => this.onTextBoxChange(e,'delGroupLabel')}/>
          </EuiFormRow>
          <EuiFormRow label="Hide Conj for One">
          <EuiSwitch
          checked={settings['hideConjForOne']}
          onChange={(e) => this.onCheckBoxChange(e,'hideConjForOne')}
          />
          </EuiFormRow>
          <EuiFormRow label="Render Conj as False">
          <EuiSwitch
          checked={settings['renderConjsAsRadios']}
          onChange={(e) => this.onCheckBoxChange(e,'renderConjsAsRadios')}
          />
          </EuiFormRow>
          <EuiFormRow label="Clear Value On Change Field">
          <EuiSwitch
          checked={settings['clearValueOnChangeField']}
          onChange={(e) => this.onCheckBoxChange(e,'clearValueOnChangeField')}
          />
          </EuiFormRow>
          <EuiFormRow label="Clear Value On Change Operator">
          <EuiSwitch
          checked={settings['clearValueOnChangeOp']}
          onChange={(e) => this.onCheckBoxChange(e,'clearValueOnChangeOp')}
          />
          </EuiFormRow>
          <EuiFormRow label="Set Default Field And Op">
          <EuiSwitch
          checked={settings['setDefaultFieldAndOp']}
          onChange={(e) => this.onCheckBoxChange(e,'setDefaultFieldAndOp')}
          />
          </EuiFormRow>
          <EuiFormRow label="Show Labels">
          <EuiSwitch
          checked={settings['showLabels']}
          onChange={(e) => this.onCheckBoxChange(e,'showLabels')}
          />
          </EuiFormRow>
          <EuiFormRow label="Read-only Mode">
          <EuiSwitch
          checked={settings['readonlyMode']}
          onChange={(e) => this.onCheckBoxChange(e,'readonlyMode')}
          />
          </EuiFormRow>
          <EuiFormRow label="Show Not">
          <EuiSwitch
          checked={settings['showNot']}
          onChange={(e) => this.onCheckBoxChange(e,'showNot')}
          />
          </EuiFormRow>
          <EuiFormRow label="Can leave empty group">
          <EuiSwitch
          checked={settings['canLeaveEmptyGroup']}
          onChange={(e) => this.onCheckBoxChange(e,'canLeaveEmptyGroup')}
          />
          </EuiFormRow>
          <EuiFormRow label="Can Reorder">
          <EuiSwitch
          checked={settings['canReorder']}
          onChange={(e) => this.onCheckBoxChange(e,'canReorder')}
          />
          </EuiFormRow>
          <EuiFormRow
            label="Maximum Labels Length"
            compressed>
          <EuiFieldNumber
          value={settings['maxLabelsLength'] ? settings['maxLabelsLength']: 0}
          onChange={(e) => this.onNumberBoxChange(e,'maxLabelsLength')}
          compressed
        />
        </EuiFormRow>
        <EuiFormRow
            label="Maximum Nesting"
            compressed>
          <EuiFieldNumber
          value={settings['maxNesting'] ? settings['maxNesting']: 0}
          onChange={(e) => this.onNumberBoxChange(e,'maxNesting')}
          compressed
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
    getSettings,updateTextBox,toogleCheckBox,updateSettings,updateNumberBox
  }
  export default connect(mapStateToProps, actions)(RuleEngine)