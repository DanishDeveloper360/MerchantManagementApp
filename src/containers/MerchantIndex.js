import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import { MerchantList } from "../components/merchants/MerchantList";
import { actions, selectors } from "../store/merchants/index";
import { DataTable } from "react-data-components";

@connect(state => {
  return {
    params: selectors.getParams(state),
    merchants: selectors.getMerchants(state)
  };
})
export class MerchantIndex extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.deleteMerchant = this.deleteMerchant.bind(this);
  }

  componentDidMount() {
    this.fetchMerchants({});
  }

  fetchMerchants(params) {
    this.context.store.dispatch(actions.fetchMerchants(params));
  }

  deleteMerchant(merchant) {
    this.context.store.dispatch(actions.deleteMerchant(merchant));
  }

  render() {
    const { params, merchants } = this.props;

    const renderAction = (val, merchant) => (
      <div className="btn-toolbar pull-right">
        <Link
          to={`/historyOfMerchantBids/${merchant.id}`}
          className="btn btn-primary"
        >
          View Bid History
        </Link>

        <Link to={`/merchants/${merchant.id}`} className="btn btn-primary">
          Edit
        </Link>
        <a
          onClick={() => {
            this.deleteMerchant(merchant);
          }}
          className="btn btn-danger"
        >
          Delete
        </a>
      </div>
    );

    const renderAvatar = (val, merchant) => (
      <img src={`${merchant.avatarUrl}`} style={{ height: 50 }} />
    );

    const renderPremium = (val, merchant) =>
      merchant.hasPremium ? "Yes" : "No";

    let columns = [
      { title: "Avatar", render: renderAvatar },
      { title: "First Name", prop: "firstname" },
      { title: "Last Name", prop: "lastname" },
      { title: "Email", prop: "email" },
      { title: "Phone", prop: "phone", width: 180 },
      { title: "Premium", prop: "hasPremium", render: renderPremium },
      { title: "Action", render: renderAction, width: 325 }
    ];

    return (
      <div>
        <div className="row">
          <div className="col-md-6" />
          <div className="col-md-6 text-right">
            <Link to="/merchants/new" className="btn btn-primary">
              Add New Merchant
            </Link>
          </div>
        </div>
        <div className="row">
          <DataTable
            keys="id"
            columns={columns}
            initialData={merchants}
            initialPageLength={5}
            initialSortBy={{ prop: "firstname", order: "ascending" }}
          />
        </div>

      <h2> List of Merchants without Pagination </h2>

        {merchants.length > 0 && (
          <MerchantList merchants={merchants} onDelete={this.deleteMerchant} />
        )}
      </div>
    );
  }
}
