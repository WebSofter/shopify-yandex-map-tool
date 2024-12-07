import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

import Map from "./Map.jsx"

// 1. Choose an extension target
export default reactExtension(
  // "purchase.checkout.block.render",
  "purchase.checkout.delivery-address.render-before",
  () => (
    <Extension />
  ));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="checkout-ui" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return <BlockStack border={"dotted"} padding={"tight"}>
    <Banner title="Выберите свой адрес на карте">
      <Text emphasis="italic">Тут должна выводиться Яндекс.Карта</Text>
    </Banner>
    {/* <iframe src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B"></iframe> */}
    <Map/>
  </BlockStack>


  // return <iframe src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B"></iframe>
  // return (
  //   <BlockStack border={"dotted"} padding={"tight"}>
  //     <Banner title="checkout-ui">
  //       {translate("welcome", {
  //         target: <Text emphasis="italic">{extension.target}</Text>,
  //       })}
  //     </Banner>
  //     <Checkbox onChange={onCheckboxChange}>
  //       {translate("iWouldLikeAFreeGiftWithMyOrder")}
  //     </Checkbox>
  //     <Map/>
  //   </BlockStack>
  // );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}