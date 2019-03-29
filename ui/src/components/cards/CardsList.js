import React from 'react';
import { connect } from 'react-redux';
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard, EuiIcon,EuiButtonIcon,EuiPanel
  
  } from '@elastic/eui';
  
import { showAddActionModal,showDeleteModal,showEditPage} from'../store/actions/cards-actions'

const cardsList = (props)=>{
  
    const icons = ['Rabbitmq', 'Cloud', 'AWS','Kafka','Xpack', 'Kibana','Beats','AWS', 'Cloud','Kafka', 'Xpack','AWS','Rabbitmq', 'Cloud', 'AWS','Kafka'];
    // const cardFooterContent = (
    //     <Fragment>
    //       <EuiButtonIcon
    //       aria-label="Add Action to the Card"
    //         color="primary"
    //         size="xxxl"
    //         onClick={() => props.showAddActionModal('name')}
    //         iconType="plusInCircleFilled"
    //       />
    //       <EuiButtonIcon
    //       aria-label="Edit User Card"
    //         color="success"
    //         size="xxxl"
    //         onClick={() => window.alert('Update clicked')}
    //         iconType="indexEdit"
    //       />
    //       <EuiButtonIcon
    //       aria-label="Delete User Card"
    //         color="danger"
    //         size="xxxl"
    //         onClick={() => window.alert('Delete clicked')}
    //         iconType="trash"
    //       />
    //     </Fragment>
    //   );
let {cards,filteredCards } = props.CardsReducer;
let noUserCardsFound;
  
if(Object.keys(filteredCards).length===0||filteredCards===undefined){
noUserCardsFound = (
    <p>No Cards found for the search criteria</p>
  )
}
const cardNodes = Object.keys(filteredCards).map(function (item, index) {
  let iconType = 'logo'+icons[index%10];
  return (
    
    <EuiFlexItem grow={false} style={{ minWidth: '250px' }} key={index}>
      <EuiPanel>
      <EuiCard style={{border:0,boxShawdow:undefined}}
        icon={<EuiIcon size="l" type={iconType} />}
        title={cards[item]['name']}
        description={cards[item]['description']}
        onClick={() => window.alert('Card clicked')}
        betaBadgeLabel={item==='AWS'?'Highlighter':undefined}
        betaBadgeTooltipContent={item==='AWS' ? 'Highlighter Tip' : undefined}/>
        <EuiFlexGroup justifyContent="spaceAround" style={{ maxWidth: 250 }}>
        <EuiFlexItem grow={false}>
        <EuiButtonIcon
          aria-label="Add Action to the Card"
            color="primary"
            size="xxxl"
            onClick={() => props.showAddActionModal(cards[item]['name'])}
            iconType="plusInCircleFilled"
          />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButtonIcon
          aria-label="Edit User Card"
          isDisabled={cards[item]['inUse']}
            color="success"
            size="xxxl"
            onClick={() => props.showEditPage(cards[item]['name'])}
            iconType="indexEdit"
          />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
          <EuiButtonIcon
          aria-label="Delete User Card"
          isDisabled={cards[item]['inUse']}
            color="danger"
            size="xxxl"
            onClick={() => props.showDeleteModal(cards[item]['name'])}
            iconType="trash"
          />
          </EuiFlexItem>
          </EuiFlexGroup>
          </EuiPanel>
    </EuiFlexItem>
  );
});
     return (
        <EuiFlexGroup wrap gutterSize="l">
       {cardNodes} 
       {noUserCardsFound}
        </EuiFlexGroup>
        )
}
const mapStateToProps = ({CardsReducer}) => {
    return {
      CardsReducer
    }
}
const actions = {showAddActionModal,showDeleteModal,showEditPage}
const CardsList = connect(mapStateToProps, actions)(cardsList)
export default CardsList;