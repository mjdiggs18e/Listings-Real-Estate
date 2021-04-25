import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../firebase/Firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useHistory } from "react-router-dom";

const CreateContainer = styled.div`
  padding: 2rem;
`;

const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CreateTitle = styled.h1`
  font-size: 26px;
  font-weight: 500;
`;
const CreateLabel = styled.label`
  margin: 1rem 0;
`;
const CreateInput = styled.input`
  display: block;
  width: 300px;
  padding: 0.7rem;
  outline: none;
  border: 1px solid #a8b4c1;
  border-radius: 4px;
  font-family: "Open Sans";
  margin-top: 0.5rem;
`;
const CreateButton = styled.button`
  font-family: "Open Sans";
  width: 250px;
  padding: 0.7rem;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #326b5b;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  margin: 2rem 0;
`;

const CreateSelect = styled.select`
  display: block;
  width: 200px;
  padding: 0.7rem;
  outline: none;
  border: 1px solid #a8b4c1;
  border-radius: 4px;
  font-family: "Open Sans";
  margin-top: 0.5rem;
`;
const CreateOption = styled.option`
  margin: 1rem;
`;
const CreateSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const CreateTextarea = styled.textarea`
  display: block;
  width: 400px;
  padding: 0.7rem;
  outline: none;
  border: 1px solid #a8b4c1;
  border-radius: 4px;
  font-family: "Open Sans";
  margin-top: 0.5rem;
  resize: none;
  height: 100px;
`;

const CreateList = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image type");
    }
  };

  const history = useHistory();
  const { database } = useAuth();
  const monthlyRent = useRef();
  const securityDeposit = useRef();
  const bedrooms = useRef();
  const bathrooms = useRef();
  const squarefeet = useRef();
  const dateAvailable = useRef();
  const leaseDuration = useRef();

  const ac = useRef();
  const balcony = useRef();
  const furnished = useRef();
  const hardwoodFloor = useRef();
  const wheelchairAccess = useRef();
  const garageParking = useRef();
  const offstreetParking = useRef();

  const laundry = useRef();
  const pets = useRef();

  const description = useRef();
  const leaseSummary = useRef();

  const name = useRef();
  const email = useRef();
  const phone = useRef();

  const rentBy = useRef();

  const tourMonday = useRef();
  const tourTuesday = useRef();
  const tourWednesday = useRef();
  const tourThursday = useRef();
  const tourFriday = useRef();
  const tourSaturday = useRef();
  const tourSunday = useRef();

  const addListing = (e) => {
    e.preventDefault();
    dayjs.extend(relativeTime);

    database
      .collection("listings")
      .add({
        monthlyRent: monthlyRent.current.value,
        securityDeposit: securityDeposit.current.value,
        bedrooms: bedrooms.current.value,
        bathrooms: bathrooms.current.value,
        squarefeet: squarefeet.current.value,
        dateAvailable: dateAvailable.current.value,
        leaseDuration: leaseDuration.current.value,
        ac: ac.current.checked ? ac.current.value : "",
        balcony: balcony.current.checked ? balcony.current.value : "",
        furnished: furnished.current.checked ? furnished.current.value : "",
        hardwoodFloor: hardwoodFloor.current.checked
          ? hardwoodFloor.current.value
          : "",
        wheelchairAccess: wheelchairAccess.current.checked
          ? wheelchairAccess.current.value
          : "",
        garageParking: garageParking.current.checked
          ? garageParking.current.value
          : "",
        offstreetParking: offstreetParking.current.checked
          ? offstreetParking.current.value
          : "",
        laundry: laundry.current.value,
        pets: pets.current.value,
        description: description.current.value,
        leaseSummary: leaseSummary.current.value,
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        rentBy: rentBy.current.value,
        tourMonday: tourMonday.current.checked ? tourMonday.current.value : "",
        tourTuesday: tourTuesday.current.checked
          ? tourTuesday.current.value
          : "",
        tourWednesday: tourWednesday.current.checked
          ? tourWednesday.current.value
          : "",
        tourThursday: tourThursday.current.checked
          ? tourThursday.current.value
          : "",
        tourFriday: tourFriday.current.checked ? tourFriday.current.value : "",
        tourSaturday: tourSaturday.current.checked
          ? tourSaturday.current.value
          : "",
        tourSunday: tourSunday.checked ? tourSunday.current.value : "",
        createdAt: dayjs().unix(),
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <CreateContainer>
      <CreateTitle>New Listing</CreateTitle>
      <CreateForm onSubmit={addListing}>
        <CreateLabel>
          Monthly Rent
          <CreateInput type="text" ref={monthlyRent} required />
        </CreateLabel>
        <CreateLabel>
          Security deposit
          <CreateInput ref={securityDeposit} required />
        </CreateLabel>
        <CreateSection>
          <CreateLabel>
            Bedrooms
            <CreateSelect ref={bedrooms}>
              <CreateOption value="Studio">Studio</CreateOption>
              <CreateOption value="1">1</CreateOption>
              <CreateOption value="2">2</CreateOption>
              <CreateOption value="3">3</CreateOption>
              <CreateOption value="4">4</CreateOption>
              <CreateOption value="5">5</CreateOption>
              <CreateOption value="6">6</CreateOption>
              <CreateOption value="7">7</CreateOption>
              <CreateOption value="8">8</CreateOption>
            </CreateSelect>
          </CreateLabel>
          <CreateLabel>
            Bathrooms
            <CreateSelect ref={bathrooms}>
              <CreateOption value="1">1</CreateOption>
              <CreateOption value="1.5">1.5</CreateOption>
              <CreateOption value="2">2</CreateOption>
              <CreateOption value="2.5">2.5</CreateOption>
              <CreateOption value="3">3</CreateOption>
              <CreateOption value="3.5">3.5</CreateOption>
              <CreateOption value="4">4</CreateOption>
              <CreateOption value="4.5">4.5</CreateOption>
              <CreateOption value="5">5</CreateOption>
              <CreateOption value="5.5">5.5</CreateOption>
              <CreateOption value="6">6</CreateOption>
              <CreateOption value="6.5">6.5</CreateOption>
              <CreateOption value="7">7</CreateOption>
              <CreateOption value="7.5">7.5</CreateOption>
              <CreateOption value="8">8</CreateOption>
              <CreateOption value="8.5">8.5</CreateOption>
              <CreateOption value="9">9</CreateOption>
              <CreateOption value="9.5">9.5</CreateOption>
              <CreateOption value="10">10</CreateOption>
            </CreateSelect>
          </CreateLabel>
          <CreateLabel>
            Square feet
            <CreateInput ref={squarefeet} />
          </CreateLabel>
        </CreateSection>
        <CreateLabel>
          Date available
          <CreateInput type="date" ref={dateAvailable} required />
        </CreateLabel>
        <CreateLabel>
          Lease Duration
          <CreateSelect ref={leaseDuration}>
            <CreateOption value="1_month">1 month</CreateOption>
            <CreateOption value="6_month">6 months</CreateOption>
            <CreateOption value="1_year">1 year</CreateOption>
            <CreateOption value="rent_to_own">Rent to own</CreateOption>
            <CreateOption value="sublet_temporary">
              Sublet/temporary
            </CreateOption>
          </CreateSelect>
        </CreateLabel>
        <CreateTitle>Amenities and rules</CreateTitle>
        <CreateLabel>
          <input type="checkbox" ref={ac} value="a/c" />
          A/C
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={balcony} value="balcony" />
          Balcony or deck
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={furnished} value="furnished" />
          Furnished
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={hardwoodFloor} value="hardwood_floor" />
          Hardwood floor
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={wheelchairAccess} value="wheelchair" />
          Wheelchair Access
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={garageParking} value="garage_parking" />
          Garage Parking
        </CreateLabel>
        <CreateLabel>
          <input
            type="checkbox"
            ref={offstreetParking}
            value="off_street_parking"
          />
          Off-street Parking
        </CreateLabel>
        <CreateLabel>
          Laundry
          <CreateSelect ref={laundry}>
            <CreateOption value="none">None</CreateOption>
            <CreateOption value="in_unit">In unit</CreateOption>
            <CreateOption value="shared">Shared or in-building</CreateOption>
          </CreateSelect>
        </CreateLabel>
        <CreateLabel>
          Pets
          <CreateSelect ref={pets}>
            <CreateOption value="no">No pets allowed</CreateOption>
            <CreateOption value="cats_ok">Cats Ok</CreateOption>
            <CreateOption value="small_dog_ok">Small dogs Ok</CreateOption>
            <CreateOption value="large">Large dogs Ok</CreateOption>
          </CreateSelect>
        </CreateLabel>
        <CreateTitle>Detailed descriptions</CreateTitle>
        <CreateLabel>
          About the property
          <CreateTextarea type="text" ref={description} />
        </CreateLabel>
        <CreateLabel>
          Lease summary
          <CreateTextarea type="text" ref={leaseSummary} />
        </CreateLabel>
        <CreateTitle>Your contact information</CreateTitle>
        <CreateLabel>
          Name
          <CreateInput type="text" ref={name} required />
        </CreateLabel>
        <CreateLabel>
          Email
          <CreateInput type="text" ref={email} required />
        </CreateLabel>
        <CreateLabel>
          Phone
          <CreateInput type="text" ref={phone} required />
        </CreateLabel>
        <CreateLabel>
          For rent by
          <CreateSelect ref={rentBy}>
            <CreateOption value="property_owner">Property owner</CreateOption>
            <CreateOption value="management_company">
              Management company or broker
            </CreateOption>
            <CreateOption value="tenant">Tenant</CreateOption>
          </CreateSelect>
        </CreateLabel>
        <div>
          <input type="file" onChange={changeHandler} />
          {error && <p>{error}</p>}
        </div>
        <CreateTitle>Tour availability</CreateTitle>
        <CreateLabel>
          <input type="checkbox" ref={tourMonday} value="monday" />
          Monday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourTuesday} value="tuesday" />
          Tuesday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourWednesday} value="wednesday" />
          Wednesday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourThursday} value="thursday" />
          Thursday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourFriday} value="friday" />
          Friday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourSaturday} value="saturday" />
          Saturday
        </CreateLabel>
        <CreateLabel>
          <input type="checkbox" ref={tourSunday} value="sunday" />
          Sunday
        </CreateLabel>
        <CreateButton type="submit">Submit</CreateButton>
      </CreateForm>
    </CreateContainer>
  );
};

export default CreateList;
