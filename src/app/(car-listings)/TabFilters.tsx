"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonThird from "@/shared/ButtonThird";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Slider from "rc-slider";

// Sky Cabs Bangalore Commercial Fleet Categories
const typeOfCar = [
  { name: "Sedan (4+1)", description: "Prime Sedan · ₹13/km" },
  { name: "SUV / MPV (6+1)", description: "Maruti Suzuki Ertiga · ₹16/km" },
  { name: "Premium SUV (7+1)", description: "Toyota Innova Crysta · ₹19/km" },
  { name: "Tempo Traveller (12/17S)", description: "Force TT Luxury · ₹25/km" },
  { name: "Force Urbania (26S)", description: "European Van · ₹32/km" },
  { name: "Luxury Coach Bus (32-50S)", description: "Tourist Coach · ₹48/km" },
];

const carSpecifications = [
  { name: "Chilled Front & Rear AC" },
  { name: "Pushback Reclining Seats" },
  { name: "Commercial Yellow Plate (All India)" },
  { name: "Fastag & Digital Billing" },
  { name: "Large Luggage Boot / Carrier" },
  { name: "GPS Tracked with Duty Slip" },
];

const tripServices = [
  { name: "Airport Express (BLR Devanahalli)", defaultChecked: true },
  { name: "Outstation Pilgrimage (Mysuru/Tirupati)", defaultChecked: true },
  { name: "Local City Rental (8h / 80km)" },
  { name: "Wedding & Group Transport" },
];

const pickupHubs = [
  { name: "Begur & Whitefield (HQ)", defaultChecked: true },
  { name: "Indiranagar & Chandanagar" },
  { name: "Whitefield & Whitefield" },
  { name: "Kempegowda International Airport (BLR)" },
  { name: "Jayanagar / Banashankari Hub" },
];

const TabFilters = () => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
  const [rangePrices, setRangePrices] = useState([1200, 12000]);
  const [isOnSale, setIsOnSale] = useState(true);

  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTypeOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Vehicle Class</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfCar.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.description}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 focus:outline-none `}
            >
              <span>
                {`₹${rangePrices[0].toLocaleString("en-IN")} - ₹${rangePrices[1].toLocaleString("en-IN")}`}
              </span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium text-sm">Package / Trip Rate Range (₹)</span>
                      <Slider
                        range
                        className="text-primary-500"
                        min={1000}
                        max={15000}
                        step={500}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400"
                        >
                          Min Rate
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              ₹
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-full text-neutral-900 dark:text-white font-bold"
                            value={rangePrices[0].toLocaleString("en-IN")}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400"
                        >
                          Max Rate
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              ₹
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-full text-neutral-900 dark:text-white font-bold"
                            value={rangePrices[1].toLocaleString("en-IN")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isOnSale
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>Zero Surge Guarantee</span>
      </div>
    );
  };

  const renderTabsGuestsAndBags = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Seats & Bags</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <NcInputNumber label="Passengers (Up to 50)" max={50} defaultValue={4} />
                    <NcInputNumber label="Luggage Bags" max={40} defaultValue={3} />
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // Mobile Filter Dialog
  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>Fleet Filters</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilterMobile}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as="div"
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full font-sans">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-neutral-900 dark:text-white"
                    >
                      Commercial Fleet Filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-lg font-bold">Vehicle Class</h3>
                        <div className="mt-4 relative">
                          {renderMoreFilterItem(typeOfCar)}
                        </div>
                      </div>

                      <div className="py-7">
                        <h3 className="text-lg font-bold">Trip Services</h3>
                        <div className="mt-4 relative">
                          {renderMoreFilterItem(tripServices)}
                        </div>
                      </div>

                      <div className="py-7">
                        <h3 className="text-lg font-bold">Pickup Hubs</h3>
                        <div className="mt-4 relative">
                          {renderMoreFilterItem(pickupHubs)}
                        </div>
                      </div>

                      <div className="py-7">
                        <h3 className="text-lg font-bold">Vehicle Specifications</h3>
                        <div className="mt-4 relative">
                          {renderMoreFilterItem(carSpecifications)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  // Desktop More Filter Modal
  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>More Fleet Filters (4)</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as="div"
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full font-sans">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-neutral-900 dark:text-white"
                    >
                      Commercial Fleet & Service Filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-lg font-bold">Vehicle Specifications</h3>
                        <div className="mt-4 relative ">
                          {renderMoreFilterItem(carSpecifications)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-lg font-bold">Trip Services</h3>
                        <div className="mt-4 relative ">
                          {renderMoreFilterItem(tripServices)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-lg font-bold">Pickup Hubs</h3>
                        <div className="mt-4 relative ">
                          {renderMoreFilterItem(pickupHubs)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfCars()}
        {renderTabsPriceRage()}
        {renderTabsGuestsAndBags()}
        {renderTabMoreFilter()}
      </div>
      <div className="flex lg:hidden space-x-4">
        {renderTabMobileFilter()}
        {renderTabOnSale()}
      </div>
    </div>
  );
};

export default TabFilters;
