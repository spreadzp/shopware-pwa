<template>
  <SwPersonalDetails :personal-details="personalDetails">
    <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', CHECKOUT_STEPS.PERSONAL_DETAILS)"
      >
        Edit
      </SwButton>
    </template>
  </SwPersonalDetails>
</template>
<script>
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { usePersonalDetailsStep } from "@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep"
import { CHECKOUT_STEPS } from "@shopware-pwa/default-theme/logic/checkout"
import { useCheckout, useUser } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwPersonalDetails from "@shopware-pwa/default-theme/components/SwPersonalDetails"

export default {
  name: "PersonalDetailsSummary",
  components: {
    SwPersonalDetails,
    SwButton,
  },
  setup() {
    const { firstName, lastName, email } = usePersonalDetailsStep()
    const { isGuestOrder } = useCheckout()
    const { user } = useUser()

    return {
      personalDetails: computed(() => ({
        firstName: isGuestOrder.value ? firstName.value : user.value.firstName,
        lastName: isGuestOrder.value ? lastName.value : user.value.lastName,
        email: isGuestOrder.value ? email.value : user.value.email,
      })),
      CHECKOUT_STEPS,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.review {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacer-base);
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
