import React from "react";
import Textarea from "react-textarea-autosize";
import { actions, selectors } from "../store/merchants/index";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import { MerchantBidList } from "../components/merchants/MerchantBidList";
import { MerchantBidHistoryIndex } from "./MerchantBidHistoryIndex";
import { fail } from "assert";

@connect((state, props) => {
  return {
    merchant: selectors.getMerchant(state, props.params.merchantId)
  };
})
export class MerchantsEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  static propTypes = {
    params: React.PropTypes.object,
    merchant: React.PropTypes.object
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
        bids: [
          {
            id: 0,
            carTitle: "",
            amount: "",
            created: ""
          },
          {
            id: 0,
            carTitle: "",
            amount: "",
            created: ""
          },
          {
            id: 0,
            carTitle: "",
            amount: "",
            created: ""
          }
        ]
      }
     
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.merchant, this.state.merchant)) {
      this.setState({ ...this.state, merchant: nextProps.merchant });
    }
  }

  componentDidMount() {
    if (this.state.merchantId) {
      this.context.store.dispatch(
        actions.fetchMerchant(this.props.params.merchantId)
      );
    }
  }

  handleChange(field, e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const merchant = Object.assign({}, this.state.merchant, {
      [field]: value
    });
    this.setState(Object.assign({}, this.state, { merchant }));
  }


  handleSubmit() {
    if (this.state.merchantId) {
      this.context.store.dispatch(actions.updateMerchant(this.state.merchant));
    } else {
      this.addBids();
      this.context.store.dispatch(actions.createMerchant(this.state.merchant));
    }
  }

  addBids() {
    const newBids = this.state.merchant.bids.map((bid, i) => {
      bid.id = Math.floor(Math.random() * 100);
      bid.carTitle = "Car Title " + (i + 1);
      bid.amount = 10000 * (i+1);
      bid.created = new Date();
      return bid;
    });

    this.handleChange("bids", {
      target: { value: newBids }
    });
  }

  render() {
    console.log(this.state.merchant);

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label className="label-control">First Name</label>
          <input
            required
            type="text"
            className="form-control"
            value={this.state.merchant.firstname}
            onChange={this.handleChange.bind(this, "firstname")}
          />
        </div>

        <div className="form-group">
          <label className="label-control">Last Name</label>
          <input
            required
            type="text"
            className="form-control"
            value={this.state.merchant.lastname}
            onChange={this.handleChange.bind(this, "lastname")}
          />
        </div>

        <div className="form-group">
          <label className="label-control">Avatar</label>
          <input
            type="url"
            required
            className="form-control"
            value={this.state.merchant.avatarUrl}
            onChange={this.handleChange.bind(this, "avatarUrl")}
          />
        </div>

        <div className="form-group">
          <label className="label-control">Email</label>
          <input
            required
            type="email"
            className="form-control"
            value={this.state.merchant.email}
            onChange={this.handleChange.bind(this, "email")}
          />
        </div>

        <div className="form-group">
          <label className="label-control">Phone (format: xxx-xxx-xxxx) </label>
          <input
            required
            type="text"
            pattern="^\d{3}-\d{3}-\d{4}$"
            className="form-control"
            value={this.state.merchant.phone}
            onChange={this.handleChange.bind(this, "phone")}
          />
        </div>

        <div className="form-group">
          <label className="label-control">Has Premium ? </label>

          <div>
            <label>
              <input
                type="checkbox"
                checked={this.state.merchant.hasPremium}
                onChange={this.handleChange.bind(this, "hasPremium")}
              />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-default">
          {this.state.merchantId ? "Update" : "Create"} Merchant
        </button>

        {this.state.merchantId &&
          this.state.merchant.bids.length > 0 && (
            <MerchantBidHistoryIndex
              merchantId={this.state.merchant.id}
              params={this.state}
            />
          )}
      </form>
    );
  }
}
