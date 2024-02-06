import tw from 'tailwind-styled-components'
interface IsActive {
  $active?: boolean
}

export const StyledWorkspaceGrid = tw.div`
grid grid-cols-3 gap-4 min-h-full pt-4 ml-4 mr-4
`

export const StyledButton = tw.button`
btn btn-outline btn-accent h-24 gap-2 uppercase
`

export const StyledButtonWidget = tw.button`
btn btn-outline btn-primary gap-2
`

export const StyledReadyInput = tw.input`
btn btn-outline btn-accent gap-2 uppercase flex-1 m-4 md:min-w-40
`

export const StyledCancelButton = tw.button`
btn btn-outline btn-error gap-2 uppercase flex-1 m-4 md:min-w-40
`

export const StyledWorkspace = tw.button`
btn btn-outline btn-primary h-24 gap-2
`

export const StyledDialog = tw.dialog`
modal
`

export const StyledModalBox = tw.div`
!w-11/12 !max-w-5xl !h-min-[80%] 
modal-box
flex flex-col items-center justify-center
`
export const StyledFormBody = tw.div`
card-body
w-full sm:w-[90%] lg:w-[75%]
`

export const StyledFormWrapper = tw.div`
card max-w-[96%] md:max-w-[70%] shadow-2xl flex flex-col items-center bg-base-300 dark:bg-base-300-dark h-min-[70%] w-full
`
export const StyledFormHeader = tw.h2`
w-full 
h-14 
inline-flex 
items-center 
justify-center 
font-bold 
rounded-t-lg
uppercase
bg-accent 
text-accent-content
dark:bg-accent-dark
dark-text-accent-content-dark
`

export const WidgetTab = tw.button<IsActive>`
tab 
${(p) => (p.$active ? 'tab-active' : '')}
`

export const StyledDropdownButton = tw.button<IsActive>`
btn
${(p) => (p.$active ? 'btn-primary' : 'btn-ghost')}
`
export const StyledDropdownContent = tw.div`
dropdown-content 
top-px max-h-96 
h-[19vh]
w-52 
overflow-y-auto 
mt-14
rounded-t-box rounded-b-box 
shadow-2xl 
bg-base-200 
text-base-content 
dark:bg-base-200-dark 
dark:text-base-content-dark
`

export const StyledFunctionalButton = tw.button`
btn btn-xs btn-outline btn-info dark:opacity-50 hover:opacity-100 btn-ghost
`
export const StyledWidgetMain = tw.div`
w-full 
md:w-[80%] 
card card-normal 
bg-base-300 dark:bg-base-300-dark 
shadow-xl 
flex flex-col items-center 
p-4
`
