import React from "react";
import "./Header.css";
import Navbar from "../../components/Navbar";
import Search from "./Search";
import Card from "./Card";
import carImg from "../../assets/images/Car.jpg";
import houseImg from "../../assets/images/House.jpg";
import factoryImg from "../../assets/images/Factory.jpg";
import vacationImg from "../../assets/images/Vacation.jpeg";

function Header({ setCategory, category }) {
  return (
    <header className="header">
      <div className="header-mask"></div>
      <Navbar></Navbar>
      <main>
        <div className="heading">
          <h1>Turn Your Assets Into Income</h1>
          <p>
            BorrowBe is a unique marketplace connecting owners who want to rent,
            lease, or finance their items with interested people. Whether you’re
            an owner, service provider, or a potential customer, the
            opportunities are endless.
          </p>
        </div>
        <Search category={category} setCategory={setCategory}></Search>
        <div className="cards">
          <Card text={"Real Estate"} img={houseImg} category={"Real Estate"} />
          <Card
            text={"Business & Industries"}
            img={factoryImg}
            category={"Business & Industries"}
          />

          <Card
            text={"Travel, Vacation & Party Space"}
            img={vacationImg}
            category={"Travel, Vacation & Party Space"}
          />
          <Card
            text={"Car, Truck, RVs & Vehicles"}
            img={carImg}
            category={"Car, Truck, RVs & Vehicles"}
          />
        </div>
      </main>
    </header>
  );
}

export default Header;
