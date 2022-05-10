import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function SpendingList({ filter, currency, spendings, setSpendings, updatedForm }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/spendings/`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [updatedForm]);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        spendings.filter((spending) => {
          if (currency === spending.currency) return spending; 
          if (currency === "ALL") return spending;
        })
        .sort((a,b) => {
          if (filter === '-date') {
            return new Date(b.spent_at) - new Date(a.spent_at);
          } else if (filter === 'date') {
            return new Date(a.spent_at) - new Date(b.spent_at);
          } else if (filter === '-amount_in_huf') {
            if(b.currency === 'HUF' && a.currency !== 'HUF') return b.amount - (a.amount * 300);
            if(b.currency !== 'HUF' && a.currency === 'HUF') return (b.amount * 300) - a.amount;
            return b.amount - a.amount;
          } else if (filter === 'amount_in_huf') {
            if(a.currency === 'HUF' && b.currency !== 'HUF') return a.amount - (b.amount * 300);
            if(a.currency !== 'HUF' && b.currency === 'HUF') return (a.amount * 300) - b.amount;
            return a.amount - b.amount;
          }})
        .map((spending, idx) => (
          <Spending key={idx}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {(spending.amount / 1).toFixed(2)}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
