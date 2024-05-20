import React from "react";
import "./index.css";

export default function TenancyAgreement() {
  return (
    <div className="doc_content_t">
      <h1 className="doc_h1">Tenancy Agreement Links by Province</h1>
      <p className="doc_p">
        Please visit the links below pertaining to your province to locate the
        necessary forms and details about agreements.
      </p>
      <table className="doc_table" border="1">
        <thead>
          <tr>
            <th>Agreement Type</th>
            <th>Province</th>
            <th>Official Links</th>
            <th>Forms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Alberta</td>
            <td>
              <a
                href="https://www.alberta.ca/rights-and-responsibilities"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td>
              <a
                href="https://www.alberta.ca/forms-and-documents"
                target="_blank"
              >
                Forms
              </a>
            </td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Ontario</td>
            <td>
              <a
                href="https://forms.mgcs.gov.on.ca/en/dataset/047-2229"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>British Columbia</td>
            <td>
              <a
                href="https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy/tenancy-agreements"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Quebec</td>
            <td>
              <a
                href="https://www.quebec.ca/en/homes-and-housing/renting/leases"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td>
              <a
                href="https://www.tal.gouv.qc.ca/en/assignment-of-a-lease-or-subleasing/assignment-of-lease-agreement-and-notice-to-sublet-the-dwelling"
                target="_blank"
              >
                Forms
              </a>
            </td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Saskatchewan</td>
            <td>
              <a
                href="https://www.saskatchewan.ca/residents/housing-and-renting/renting-and-leasing/tenancy-agreements"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Manitoba</td>
            <td>
              <a
                href="https://www.gov.mb.ca/cca/rtb/ot/download.html"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>New Brunswick</td>
            <td>
              <a
                href="https://www2.gnb.ca/content/gnb/en/corporate/promo/renting-in-new-brunswick.html"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td>
              <a
                href="https://www.pxw1.snb.ca/snb7001/e/1000/CSS-FOL-SNB-45-0065E.pdf"
                target="_blank"
              >
                Forms
              </a>
            </td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Newfoundland and Labrador</td>
            <td>
              <a
                href="https://www.gov.nl.ca/dgsnl/landlord-tenant/"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td>
              <a
                href="https://www.gov.nl.ca/dgsnl/files/landlord-rental-agreement.pdf"
                target="_blank"
              >
                Forms
              </a>
            </td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Northwest Territories</td>
            <td>
              <a
                href="https://www.justice.gov.nt.ca/en/rental-agreements/"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Nova Scotia</td>
            <td>
              <a
                href="https://beta.novascotia.ca/residential-tenancy-forms"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Nunavut</td>
            <td>
              <a
                href="https://www.nunavutlegislation.ca/en/consolidated-law/residential-tenancies-act-consolidation"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Prince Edward Island</td>
            <td>
              <a href="https://peirentaloffice.ca/forms/" target="_blank">
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Tenancy Agreement</td>
            <td>Yukon</td>
            <td>
              <a
                href="https://yukon.ca/en/tenancy-agreement-template-landlords-and-tenants"
                target="_blank"
              >
                Official Link
              </a>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
