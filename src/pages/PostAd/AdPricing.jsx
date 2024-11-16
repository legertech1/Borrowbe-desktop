import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../store/cartSlice";
import Play from "../../components/IconPlayer";
import Checkbox from "../../components/Shared/Checkbox";
import Modal from "../../components/Modal";
import Input from "../../components/Shared/Input";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Info from "../../components/Info";

import Balloon from "../../assets/animatedIcons/balloon.json";
import AirplaneIcon from "../../assets/animatedIcons/airplane.json";
import Rocket from "../../assets/animatedIcons/rocket.json";

import CheckIcon from "@mui/icons-material/Check";
import BusinessInfo from "../../components/BusinessInfo";
import Dropdown from "../../components/Shared/Dropdown";
import { setFormData } from "../../store/adSlice";
import {
  AddCircleOutline,
  Adjust,
  AdjustOutlined,
  AutoAwesome,
  AutoAwesomeMotionOutlined,
  AutoAwesomeOutlined,
  Sell,
  ShoppingBag,
} from "@mui/icons-material";
import { PackageIcon } from "styled-icons/feather";
import { PackageDependencies } from "styled-icons/octicons";

function AdPricing({ category, preconfig, ignoreFree }) {
  const formData = useSelector((state) => state.ad);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const [showBusinessInfoForm, setShowBusinessInfoForm] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (preconfig) dispatch(updateCart({ ...preconfig, addOns: {} }));
  }, []);
  return (
    <>
      <div className="pricing_section">
        <h2>
          <PackageIcon className="package_icon" /> Pick a Package that fits
        </h2>
        <div className="plans">
          <Package
            ignoreFree={ignoreFree}
            plan={category?.pricing?.Premium}
            name="Premium"
            category={category}
            selected={cart?.package?.name == "Premium"}
            onClick={(free) =>
              dispatch(
                updateCart({
                  ...cart,
                  package: {
                    name: "Premium",
                    item: category?.pricing?.Premium,
                    free,
                  },
                })
              )
            }
            ads={user?.data?.postedAds}
          />
          <Package
            ignoreFree={ignoreFree}
            plan={category?.pricing?.Standard}
            name="Standard"
            category={category}
            selected={cart?.package?.name == "Standard"}
            onClick={(free) =>
              dispatch(
                updateCart({
                  ...cart,
                  package: {
                    name: "Standard",
                    item: category?.pricing?.Standard,
                    free,
                  },
                })
              )
            }
            ads={user?.data?.postedAds}
          />
          <Package
            ignoreFree={ignoreFree}
            plan={category?.pricing?.Basic}
            name="Basic"
            category={category}
            selected={cart?.package?.name == "Basic"}
            onClick={(free) =>
              dispatch(
                updateCart({
                  ...cart,
                  package: {
                    name: "Basic",
                    item: category?.pricing?.Basic,
                    free,
                  },
                })
              )
            }
            ads={user?.data?.postedAds}
          />
        </div>
      </div>
      <div className="pricing_section">
        <h2>
          <AddCircleOutline /> Choose Add-Ons for your Ad
        </h2>
        <div className="add_ons">
          {category?.pricing?.AddOns?.bumpUp && (
            <AddOn
              addOn={category.pricing.AddOns.bumpUp}
              name={"Bump Up your Ad"}
              selected={cart?.addOns?.bumpUp}
              setSelected={(val) =>
                dispatch(
                  updateCart({
                    ...cart,
                    addOns: { ...cart.addOns, bumpUp: val },
                  })
                )
              }
              type={"bumpUp"}
            />
          )}{" "}
          {category?.pricing?.AddOns?.featured && (
            <AddOn
              addOn={category.pricing.AddOns.featured}
              name={"Featured Ad"}
              selected={cart?.addOns?.featured}
              setSelected={(val) =>
                dispatch(
                  updateCart({
                    ...cart,
                    addOns: { ...cart.addOns, featured: val },
                  })
                )
              }
              type={"featured"}
            />
          )}
          {category?.pricing?.AddOns?.highlighted && (
            <AddOn
              addOn={category.pricing.AddOns.highlighted}
              name={"Highlighted Ad"}
              selected={cart?.addOns?.highlighted}
              setSelected={(val) =>
                dispatch(
                  updateCart({
                    ...cart,
                    addOns: { ...cart.addOns, highlighted: val },
                  })
                )
              }
              type={"highlighted"}
            />
          )}
          {category?.pricing?.AddOns?.homepageGallery && (
            <AddOn
              addOn={category.pricing.AddOns.homepageGallery}
              name={"Homepage Gallery"}
              selected={cart?.addOns?.homepageGallery}
              setSelected={(val) =>
                dispatch(
                  updateCart({
                    ...cart,
                    addOns: { ...cart.addOns, homepageGallery: val },
                  })
                )
              }
              type={"homepage"}
            />
          )}
        </div>
      </div>
      <div className="pricing_section">
        <h2>
          <AutoAwesomeOutlined /> Some extras to enhance your Ad
        </h2>
        <div className="extras">
          {" "}
          <div className="extra" style={{ width: "100%" }}>
            <div className="info">
              <Checkbox
                checked={cart?.extras?.business}
                setChecked={(v) =>
                  dispatch(
                    updateCart({
                      ...cart,
                      extras: {
                        business: v ? category.pricing.Extras.business : null,
                      },
                    })
                  )
                }
              />
              <h3>
                Post as Business Ad{" "}
                <Info
                  info={
                    "Business ads include your business details and are great for building your business's reach on the platform."
                  }
                />
              </h3>
              <p className="price">
                ${category?.pricing?.Extras?.business?.price}
              </p>
            </div>

            <div className={"form" + (cart?.extras?.business ? " active" : "")}>
              {user?.BusinessInfo?.name &&
                user.BusinessInfo?.LOGO &&
                user.BusinessInfo.address && (
                  <div className="business_ov">
                    <img src={user?.BusinessInfo.LOGO} alt="" />
                    <div>
                      <h4>{user?.BusinessInfo?.name}</h4>
                      <p>{user?.BusinessInfo?.address}</p>
                    </div>
                  </div>
                )}
              {(!user.BusinessInfo?.name ||
                !user.BusinessInfo?.LOGO ||
                !user.BusinessInfo.address) && (
                <div className="no_business_info">
                  Please Enter your Business Info to Post as a Business
                </div>
              )}
              <button
                className="review_business_info btn_blue_m"
                onClick={(e) => setShowBusinessInfoForm(true)}
              >
                Edit Business Info
              </button>
              {showBusinessInfoForm && (
                <Modal close={(e) => setShowBusinessInfoForm(false)}>
                  <BusinessInfo close={(e) => setShowBusinessInfoForm(false)} />
                </Modal>
              )}
            </div>
          </div>
          {!cart?.extras?.business && (
            <>
              <div className="extra">
                <div className="info">
                  <Checkbox
                    checked={cart?.extras?.website}
                    setChecked={(v) =>
                      dispatch(
                        updateCart({
                          ...cart,
                          extras: {
                            ...cart.extras,
                            website: v ? category.pricing.Extras.website : null,
                          },
                        })
                      )
                    }
                  />
                  <h3>
                    Add your Website{" "}
                    <Info
                      info={
                        "Adding a link to your website or a link to someplace about your service or product are great to provide all details and information about the item in question and can lead to a higher demand."
                      }
                    />
                  </h3>
                  <p className="price">
                    ${category?.pricing?.Extras?.website?.price}
                  </p>
                </div>
                <div
                  className={"form" + (cart?.extras?.website ? " active" : "")}
                >
                  <div className="field_container">
                    <Input
                      value={cart?.extras?.website?.url || ""}
                      placeholder={"Website URL"}
                      onChange={(e) =>
                        dispatch(
                          updateCart({
                            ...cart,
                            extras: {
                              ...cart.extras,
                              website: {
                                ...cart?.extras?.website,
                                url: e.target.value,
                              },
                            },
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="extra">
                <div className="info">
                  <Checkbox
                    checked={cart?.extras?.youtube}
                    setChecked={(v) =>
                      dispatch(
                        updateCart({
                          ...cart,
                          extras: {
                            ...cart.extras,
                            youtube: v ? category.pricing.Extras.youtube : null,
                          },
                        })
                      )
                    }
                  />
                  <h3>
                    Add a Youtube Video{" "}
                    <Info
                      info={
                        "Youtube videos about your service or product are great to provide all details and information about the item in question and can lead to a higher demand."
                      }
                    />
                  </h3>
                  <p className="price">
                    ${category?.pricing?.Extras?.youtube?.price}
                  </p>
                </div>
                <div
                  className={"form" + (cart?.extras?.youtube ? " active" : "")}
                >
                  <div className="field_container">
                    <Input
                      value={cart?.extras?.youtube?.url || ""}
                      placeholder={"Youtube video URL"}
                      onChange={(e) =>
                        dispatch(
                          updateCart({
                            ...cart,
                            extras: {
                              ...cart.extras,
                              youtube: {
                                ...cart?.extras?.youtube,
                                url: e.target.value,
                              },
                            },
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export function Package({
  plan,
  name,
  category,
  selected,
  onClick = () => {},
  ads,
  ignoreFree,
}) {
  if (!plan) return <></>;
  const free = ads ? (ads[category.name]?.free || 0) < plan.freeAds : false;

  return (
    <div
      className={"package" + (selected ? " selected" : "") + " " + name}
      onClick={() => onClick(free)}
    >
      <div className="coloured_cont">
        <div className={"coloured " + name}>
          <div className="icon">
            <Play
              icon={(() => {
                if (name == "Basic") return Balloon;
                else if (name == "Standard") return AirplaneIcon;
                else if (name == "Premium") return Rocket;
              })()}
            />
          </div>
          <h1 className={name}>
            {name} <span></span>
          </h1>
        </div>
      </div>
      <div className="lower">
        <div className="details">
          <div>
            {" "}
            <span className={plan.images ? "blue" : "red"}>
              {plan.images ? <CheckIcon /> : <CloseOutlinedIcon />}
            </span>
            Post upto {plan.images} images
          </div>

          <div>
            <span>
              <span className={plan.featured ? "blue" : "red"}>
                {plan.featured ? <CheckIcon /> : <CloseOutlinedIcon />}
              </span>
            </span>{" "}
            Featured Ad for {plan.featured || 0} days{" "}
            <Info
              info={
                "Featured ads will be placed above other ads and are a great way to grab the buyer's attention first."
              }
            />
          </div>

          <div>
            <span>
              <span className={plan.highlighted ? "blue" : "red"}>
                {plan.highlighted ? <CheckIcon /> : <CloseOutlinedIcon />}
              </span>
            </span>{" "}
            Highlighted Ad for {plan.highlighted || 0} days{" "}
            <Info info="Highlighted ads have special styles applied to stand out from other ads and grab the buyers attenton over others." />
          </div>

          <div>
            <span>
              <span className={plan.homepageGallery ? "blue" : "red"}>
                {plan.homepageGallery ? <CheckIcon /> : <CloseOutlinedIcon />}
              </span>
            </span>{" "}
            Listed on Homepage for {plan.homepageGallery || 0} days{" "}
            <Info
              info={
                "Listing your ad on the Homepage gallery is great for collecting a lot of impressions and interaction. It's the best place for your Ad to show up on."
              }
            />
          </div>
          <div>
            <span>
              <CheckIcon />
            </span>{" "}
            Expires in {category?.rules?.adDuration || 0} days
          </div>
        </div>
        {free && !ignoreFree ? (
          <button className={"select_package " + name}>
            <span className="fr">Free </span>
            <p className="free_text">
              {" "}
              ($
              {String(plan.price).includes(".")
                ? plan.price
                : plan.price + ".00"}{" "}
              after {plan.freeAds} listings)
            </p>
          </button>
        ) : (
          <button className={"select_package " + name}>
            $
            {String(plan.price).includes(".") ? plan.price : plan.price + ".00"}
          </button>
        )}
      </div>
    </div>
  );
}
function AddOn({ addOn, setSelected, name, selected, type }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (selected) {
      setSelected(addOn[current]);
    }
  }, [current]);
  return (
    <div className="add_on">
      {/* <Checkbox
        checked={selected}
        setChecked={(e) =>
          !selected ? setSelected(addOn[current]) : setSelected(null)
        }
      />{" "} */}
      <h3>{name} </h3>{" "}
      {type == "bumpUp" && (
        <Info info="After the ad is posted it gradually loses rankings as new ads get posted. A bump up makes your ad go to the top rankings again and is great to keep your ad fresh and in front of the buyers."></Info>
      )}
      {type == "featured" && (
        <Info
          info={
            "Featured ads will be placed above other ads and are a great way to grab the buyer's attention first."
          }
        />
      )}
      {type == "highlighted" && (
        <Info info="Highlighted ads have special styles applied to stand out from other ads and grab the buyers attenton over others." />
      )}
      {type == "homepage" && (
        <Info
          info={
            "Listing your ad on the Homepage gallery is great for collecting a lot of impressions and interaction. It's the best place for your Ad to show up on."
          }
        />
      )}
      {/* <Dropdown
        value={(addOn[current].days || addOn[current].frequency) + " days"}
        array={addOn.map((item, index) => {
          return {
            text: (item.days || item.frequency) + " days",
            index: index,
          };
        })}
        setValue={(v) => setCurrent(v.index)}
      />{" "} */}
      <div className="addon_select">
        {addOn.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (selected && current == index) setSelected(false);
                if ((selected && current != index) || !selected) {
                  setCurrent(index);
                  setSelected(true);
                }
              }}
              className={current == index && selected ? "selected" : ""}
            >
              {item.frequency
                ? "every " + item.frequency + " days"
                : "+" + item.days + " days"}{" "}
              for
              <span>${item.price}</span>
            </div>
          );
        })}
      </div>
      {/* <span className="price">${addOn[current].price}</span> */}
    </div>
  );
}

export default AdPricing;
