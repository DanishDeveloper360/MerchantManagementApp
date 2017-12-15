import React from "react";
import { connect } from "react-redux";
import { actions, selectors } from "../store/merchants/index";
import { DataTable } from "react-data-components";
import { isEqual } from "lodash";


@connect((state, props) => {
  return {
    merchant: selectors.getMerchant(state, props.params.merchantId)
  };
})
export class MerchantBidHistoryIndex extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      merchantId: this.props.params.merchantId,
      merchant: {
        firstname: "",
        lastname: "",
        avatarUrl: "",
        email: "",
        phone: "",
        hasPremium: false,
        bids: []
      }
    };
  }

  componentDidMount() {  
    if (this.state.merchantId) {
      this.context.store.dispatch(
        actions.fetchMerchant(this.props.params.merchantId)
      );
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.merchant, this.state.merchant)) {
      this.setState({ ...this.state, merchant: nextProps.merchant });
    }
  }

  render() {

    const renderDate = (val, bid) => new Date(bid.created).toLocaleString();

    let columns = [    
      { title: "Car Title", prop: "carTitle" },
      { title: "Amount", prop: "amount" },
      { title: "Created", prop: "created", render: renderDate },
    ];

    return (
      <div>
        <h2> History of bids </h2>
        <h3> { this.state.merchant.firstname } { this.state.merchant.lastname }  </h3>
        <div className="row">
          <DataTable
            keys="id"
            columns={columns}
            initialData={this.state.merchant.bids}
            initialPageLength={5}
            initialSortBy={{ prop: "carTitle", order: "ascending" }}
          />
        </div>
        
      </div>
    );
  }
}
