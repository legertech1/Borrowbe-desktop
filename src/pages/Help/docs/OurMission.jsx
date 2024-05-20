import React from "react";
import "./index.css";
import ImageParagraph from "../../../components/ImageParagraph";
import VisionMission from "../../../assets/images/vision_mission.png";
import OurVision from "../../../assets/images/our_vision.png";
import OurValues from "../../../assets/images/our_values.png";
import JoinUs from "../../../assets/images/join_us.png";

export default function OurMission() {
  return (
    <div className="doc_content_t">
      {/* <h1 className="doc_h1">Our Mission</h1> */}
      <div>
        <ImageParagraph
          imageSource={VisionMission}
          paragraphText={
            <>
              <p className="doc_p">
                At BorrowBe Inc., we are on a mission to change mindsets towards
                renting and financing, offering a revolutionary approach to how
                these processes unfold.We aim to establish a platform that
                enables individuals and businesses to save money and increase
                their earnings. Our commitment to sustainable and mindful
                consumption is at the heart of our mission, challenging
                traditional norms and providing opportunities for financial
                empowerment.
              </p>
              <p className="doc_p">
                Our belief in the power of connections goes hand in hand with
                our commitment to economic efficiency. Whether you're looking
                for the perfect rental, exploring leasing options, securing
                financing, or discovering valuable services, BorrowBe Inc. is
                your go-to destination.
              </p>
            </>
          }
        />
        <ImageParagraph
          imageSource={OurVision}
          paragraphText={
            <p className="doc_p">
              <strong>BorrowBe Inc</strong>. envision a future where the
              emphasis shifts from ownership to accessibility. By focusing on
              renting, leasing, and financing, we aim to contribute to a more
              sustainable and economically inclusive society. At
              <strong> BorrowBe Inc</strong>., we believe in the power of shared
              resources and the positive impact it can have on individuals,
              businesses, and the environment.
            </p>
          }
          reverse={true}
        />
        <ImageParagraph
          imageSource={OurValues}
          paragraphText={
            <p className="doc_p">
              Whether you're looking for the perfect rental, exploring leasing
              options, securing financing, or discovering valuable services,
              BorrowBe Inc. is your go-to destination. Our user-friendly and
              innovative advertising system is designed to make the process
              seamless, changing the way you approach and experience
              transactions. What sets us apart is our dedication to simplicity
              and efficiency. Our intuitive platform allows users to navigate
              effortlessly, ensuring a smooth experience in every transaction.
              BorrowBe Inc. strives to make the process of listing or finding
              what you need as straightforward as possible, so you can focus on
              the opportunities that lie ahead.
            </p>
          }
        />
      </div>
      <ImageParagraph
        imageSource={JoinUs}
        paragraphText={
          <p className="doc_p">
            Join us at BorrowBe Inc. and be part of a community that is
            reshaping the mindset towards renting and financing. Whether you're
            a user seeking the perfect deal or a business looking to showcase
            your offerings, we invite you to experience the convenience of a
            classified listing company that goes beyond expectations. Welcome to
            BorrowBe Inc., proudly born in Canada, Alberta, where your needs
            meet opportunities.
          </p>
        }
        reverse={true}
      />
    </div>
  );
}
