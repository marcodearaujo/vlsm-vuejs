import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VLSMCalculator from '../VLSMCalculator.vue'

describe('VLSMCalculator', () => {
  it('renders properly', () => {
    const wrapper = mount(VLSMCalculator, { props: { msg: 'Major Network' } })
    expect(wrapper.text()).toContain('Major Network')
  })
})
