#!bin/bash

# Publish project to all imported sheets of the kiosks.
echo "Preparing to update project dirs and files: .... \n\n"
ls
# Config script id for each importer sheet:


# Saintard | 1
echo "- Updating project for # Saintard... \n\n"
clasp setting scriptId 1cVzxPNLIjPWIcAlPqAfhOQxYFvq97eNTw6KTOjjqjMAU9TGTuZeozYb0
clasp push


echo "- Updating project for # Corail... \n\n"
# Corail | 2
clasp setting scriptId 1ZE0j09botra4iaAhDNdETmKSHBnIZRER9OqE0f645S_T4F4KmUF_8abK
clasp push


echo "- Updating project for # Cabaret... \n\n"
# Cabaret | 4
clasp setting scriptId 1HE45EELb6t85SISpo8Q8vAKCiML9FjaavZcUsLMl_lPKfmvMOy67tPmO
clasp push


echo "- Updating project for # Santo19... \n\n"
# Santo19 | 5
clasp setting scriptId 1pf87cykIAysgrjDitvVjtnzR2OklSkWvQSXNcMWbnwDGSOgr78htfWGN
clasp push


echo "- Updating project for # Bois9... \n\n"
# Bois9 | 6
clasp setting scriptId 130rrzgkgZgYpDPHSrRr_fbc8H2Hu9t7JJ-toM_xA7dHTeCbmjhOIzXqU
clasp push


echo "- Updating project for # Quartier Morin... \n\n"
# Quartier Morin | 7
clasp setting scriptId 1m4MGJnT4Xg68Ptoio-Nsjv31dO-x1VTlEmpA20xSK7P9IZrfmDIJZCpm
clasp push


echo "- Updating project for # Limonade... \n\n"
# Limonade | 8
clasp setting scriptId 17m30t0Wao0eI8v8V94xD-oP1x7OiCHlERpJOnelKIXR8KXj8B_aBbT2C
clasp push


echo "- Updating project for # Ouanaminthe ... \n\n"
# Ouanamonthe | 9
clasp setting scriptId 1dYurGJQ5KB_f__yiH-Pd84CojbFvTFvbXHF5SdJLbEsVKDI6yafgmTgj
clasp push


echo "- Updating project for # Dashboard+Tools+Sources ... \n\n"
# Ouanamonthe | 9
clasp setting scriptId 1eTg7xBp0_rPPjVCmpZX1ha470pXh2qR2ehGFW1RB1HF_1bheMrzL20J2
clasp push

echo "- Updating project for # Dev Dashboard+Tools+Sources ... \n\n"
# Ouanamonthe | 9
clasp setting scriptId 18xd1gq27yXnyx75P8cZmnm_FEvUcdkA-AQYvbPJyadedtGfqtehGzKqI
clasp push



echo "- Updating and setting back to project for General ... \n\n"
# General | 0 (Update it the repo back to general)
clasp setting scriptId  1iWmlrID4G4RhCnXukmBDEoMdOvat5VYaAMcXGc1spolwsP6KE4XaUCJO
clasp push