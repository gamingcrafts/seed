import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard, EuiIcon,EuiButtonIcon
  
  } from '@elastic/eui';
  
import { showAddActionModal} from'../store/actions/cards-actions'

const cardsList = (props)=>{
    const icons = ['Rabbitmq', 'Cloud', 'AWS','Kafka','Xpack', 'Kibana','Beats','AWS', 'Cloud','Kafka', 'Xpack','AWS','Rabbitmq', 'Cloud', 'AWS','Kafka'];
    const cardFooterContent = (
        <Fragment>
          <EuiButtonIcon
          aria-label="Add Action to the Card"
            color="primary"
            size="xxxl"
            onClick={() => props.showAddActionModal('name')}
            iconType="plusInCircleFilled"
          />
          <EuiButtonIcon
          aria-label="Edit User Card"
            color="success"
            size="xxxl"
            onClick={() => window.alert('Update clicked')}
            iconType="indexEdit"
          />
          <EuiButtonIcon
          aria-label="Delete User Card"
            color="danger"
            size="xxxl"
            onClick={() => window.alert('Delete clicked')}
            iconType="trash"
          />
        </Fragment>
      );
let {cards } = props.CardsReducer;
const cardNodes = Object.keys(cards).map(function (item, index) {
  let iconType = 'logo'+icons[index%10];
  return (
    
    <EuiFlexItem grow={false} style={{ minWidth: '250px' }} key={index}>
      <EuiCard
        icon={<EuiIcon size="l" type={iconType} />}
        title={cards[item]['name']}
        description={cards[item]['description']}
        onClick={() => window.alert('Card clicked')}
        betaBadgeLabel={item==='AWS'?'Highlighter':undefined}
        betaBadgeTooltipContent={item==='AWS' ? 'Highlighter Tip' : undefined}/>
        <EuiFlexItem grow={false}>
        <EuiButtonIcon
          aria-label="Add Action to the Card"
            color="primary"
            size="xxxl"
            onClick={() => props.showAddActionModal(cards[item]['name'])}
            iconType="plusInCircleFilled"
          />
          <EuiButtonIcon
          aria-label="Edit User Card"
            color="success"
            size="xxxl"
            onClick={() => window.alert('Update clicked')}
            iconType="indexEdit"
          />
          <EuiButtonIcon
          aria-label="Delete User Card"
            color="danger"
            size="xxxl"
            onClick={() => window.alert('Delete clicked')}
            iconType="trash"
          />
          </EuiFlexItem>
    </EuiFlexItem>
  );
});
     return (
        <EuiFlexGroup wrap gutterSize="l">
       {cardNodes} 
        </EuiFlexGroup>
        )
}
const mapStateToProps = ({CardsReducer}) => {
    return {
      CardsReducer
    }
}
const actions = {showAddActionModal}
const CardsList = connect(mapStateToProps, actions)(cardsList)
export default CardsList;