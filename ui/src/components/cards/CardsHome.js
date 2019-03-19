import React from 'react';
import { connect } from 'react-redux';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
    EuiCard, EuiIcon,EuiButtonIcon
  
  } from '@elastic/eui';


const cards = (props)=>{
    const icons = ['Rabbitmq', 'Cloud', 'AWS','Kafka','Xpack', 'Kibana','Beats','AWS', 'Cloud','Kafka', 'Xpack','AWS','Rabbitmq', 'Cloud', 'AWS','Kafka'];
    const cardFooterContent = (
        <div>
          <EuiButtonIcon
            color="primary"
            size="xxxl"
            onClick={() => window.alert('Add clicked')}
            iconType="plusInCircleFilled"
          />
          <EuiButtonIcon
            color="success"
            size="xxxl"
            onClick={() => window.alert('Update clicked')}
            iconType="indexEdit"
          />
          <EuiButtonIcon
            color="danger"
            size="xxxl"
            onClick={() => window.alert('Delete clicked')}
            iconType="trash"
          />
        </div>
      );

const cardNodes = icons.map(function (item, index) {
  return (
    <EuiFlexItem style={{ minWidth: '250px' }} key={index}>
      <EuiCard
        icon={<EuiIcon size="l" type={`logo${item}`} />}
        title={`Player Card ${index+1}`}
        description="A breif description about the cards"
        onClick={() => window.alert('Card clicked')}
        footer={cardFooterContent}
        betaBadgeLabel={item==='AWS'?'Highlighter':undefined}
        betaBadgeTooltipContent={item==='AWS' ? 'Highlighter Tip' : undefined}/>
    </EuiFlexItem>
  );
});
     return ( 
            <EuiPage>
            <EuiPageBody>
                <EuiPageContent>
                <EuiPageContentBody>
                    <EuiFlexGroup wrap gutterSize="l">
                        {cardNodes}
                </EuiFlexGroup> 
                </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
            </EuiPage>)
}
const mapStateToProps = ({RuleEngineReducer}) => {
    return {
        RuleEngineReducer
    }
}
const actions = {}
const CardsHome = connect(mapStateToProps, actions)(cards)
export default CardsHome;