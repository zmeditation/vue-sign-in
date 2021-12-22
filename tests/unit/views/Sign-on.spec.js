import { shallowMount } from '@vue/test-utils'
import Sign_on from '@/views/Sign-on'
describe('@/views/Sign-on.vue', () => {
  let wrapper
  let $router
  beforeEach(async () => {
    localStorage.me = '/+'
    $router = { push: jest.fn() }
    wrapper = shallowMount(Sign_on, {
      global: {
        mocks: { $router }
      }
    })
  })
  afterEach(() => {
    wrapper = null
    localStorage.clear()
    jest.clearAllMocks()
  })
  describe('Renders', () => {
    it('Renders a form for a new user', async () => {
      expect(wrapper.element).toMatchSnapshot()
    })
    it('Renders a form for a returning user', async () => {
      localStorage.me = '/+6282281823'
      wrapper = await shallowMount(Sign_on)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Methods', () => {
    describe('#auth_state', () => {
      it('Sets mobile to null if the user is signed in', () => {
        wrapper.vm.person = { mobile: '1112223333' }
        wrapper.vm.auth_state({ phoneMumber: '+16282281824' })
        expect(wrapper.vm.person.mobile).toBe(null)
      })
    })
    describe('#signed_on', () => {
      it('Sets nameless to true if no profile is found', async () => {
        await wrapper.vm.signed_on()
        expect(wrapper.vm.nameless).toBe(true)
      })
    })
  })
})
